import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  IdempotencyKeySchema,
  RecordExternalPaymentRequest,
} from '@revvy/contracts';
import { PrismaService } from '../../database/prisma.service';

const PAYMENT_ROLES = ['OWNER', 'MANAGER', 'FRONT_DESK'];

@Injectable()
export class PaymentsService {
  constructor(private readonly prisma: PrismaService) {}

  async recordExternal(
    userId: string,
    invoiceId: string,
    rawIdempotencyKey: string | undefined,
    data: RecordExternalPaymentRequest,
  ) {
    const parsedKey = IdempotencyKeySchema.safeParse(rawIdempotencyKey);
    if (!parsedKey.success) {
      throw new BadRequestException({
        code: 'IDEMPOTENCY_KEY_REQUIRED',
        message:
          'A valid Idempotency-Key header is required for payment recording.',
        fieldErrors: [
          { field: 'Idempotency-Key', message: 'Use 8-128 safe characters.' },
        ],
      });
    }

    for (let attempt = 0; attempt < 3; attempt += 1) {
      try {
        return await this.recordInTransaction(
          userId,
          invoiceId,
          parsedKey.data,
          data,
        );
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          ['P2002', 'P2034'].includes(error.code) &&
          attempt < 2
        ) {
          continue;
        }
        throw error;
      }
    }
    throw new ConflictException(
      'Payment could not be recorded after a concurrent update.',
    );
  }

  private recordInTransaction(
    userId: string,
    invoiceId: string,
    idempotencyKey: string,
    data: RecordExternalPaymentRequest,
  ) {
    return this.prisma.$transaction(
      async (transaction) => {
        const invoice = await transaction.invoice.findUnique({
          where: { id: invoiceId },
        });
        if (!invoice) throw new NotFoundException('Invoice not found.');

        const membership = await transaction.membership.findFirst({
          where: {
            userId,
            shopId: invoice.shopId,
            status: 'ACTIVE',
            role: { in: PAYMENT_ROLES },
          },
        });
        if (!membership) {
          throw new ForbiddenException({
            code: 'PAYMENT_RECORDING_FORBIDDEN',
            message: 'An active authorized staff membership is required.',
          });
        }

        const existing = await transaction.payment.findUnique({
          where: { idempotencyKey },
        });
        if (existing) {
          if (existing.invoiceId !== invoiceId) {
            throw new ConflictException({
              code: 'IDEMPOTENCY_KEY_CONFLICT',
              message: 'This idempotency key belongs to another payment.',
            });
          }
          return { payment: existing, invoice };
        }

        if (!['OPEN', 'PARTIALLY_PAID'].includes(invoice.status)) {
          throw new ConflictException({
            code: 'INVOICE_NOT_PAYABLE',
            message:
              'Only open or partially paid invoices can receive a payment.',
          });
        }
        const balanceMinor = invoice.totalMinor - invoice.paidMinor;
        if (data.amountMinor > balanceMinor) {
          throw new ConflictException({
            code: 'PAYMENT_EXCEEDS_BALANCE',
            message: 'The payment amount exceeds the invoice balance.',
          });
        }

        const payment = await transaction.payment.create({
          data: {
            invoiceId,
            amountMinor: data.amountMinor,
            currency: invoice.currency,
            status: 'SUCCEEDED',
            paymentMethod: data.method,
            externalReference: data.reference,
            note: data.note,
            recordedById: userId,
            paidAt: new Date(data.paidAt),
            idempotencyKey,
          },
        });
        const paidMinor = invoice.paidMinor + data.amountMinor;
        const updatedInvoice = await transaction.invoice.update({
          where: { id: invoiceId },
          data: {
            paidMinor,
            status:
              paidMinor === invoice.totalMinor ? 'PAID' : 'PARTIALLY_PAID',
          },
        });
        await transaction.auditEvent.create({
          data: {
            shopId: invoice.shopId,
            userId,
            action: 'invoice.payment.external_recorded',
            resource: 'Payment',
            resourceId: payment.id,
            metadata: {
              invoiceId,
              amountMinor: data.amountMinor,
              method: data.method,
            },
          },
        });
        return { payment, invoice: updatedInvoice };
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  }
}
