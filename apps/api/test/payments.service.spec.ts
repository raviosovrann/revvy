import { ConflictException, ForbiddenException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PaymentsService } from '../src/modules/payments/payments.service';

const request = {
  amountMinor: 5_000,
  method: 'CARD_TERMINAL' as const,
  paidAt: '2026-07-18T15:00:00.000Z',
  reference: 'terminal-123',
};

describe('PaymentsService', () => {
  it('retries a concurrent unique-key race so duplicate submissions converge', async () => {
    const result = {
      payment: { id: 'payment-1' },
      invoice: { id: 'invoice-1' },
    };
    const transaction = jest
      .fn()
      .mockRejectedValueOnce(
        new Prisma.PrismaClientKnownRequestError('Unique constraint', {
          code: 'P2002',
          clientVersion: '5.22.0',
        }),
      )
      .mockResolvedValueOnce(result);
    const service = new PaymentsService({ $transaction: transaction } as never);

    await expect(
      service.recordExternal('user-1', 'invoice-1', 'payment-key-123', request),
    ).resolves.toBe(result);
    expect(transaction).toHaveBeenCalledTimes(2);
  });

  it('records a successful payment and derives the invoice status atomically', async () => {
    const invoice = {
      id: 'invoice-1',
      shopId: 'shop-1',
      status: 'OPEN',
      totalMinor: 5_000,
      paidMinor: 0,
      currency: 'USD',
    };
    const payment = {
      id: 'payment-1',
      invoiceId: 'invoice-1',
      amountMinor: 5_000,
    };
    const updatedInvoice = { ...invoice, status: 'PAID', paidMinor: 5_000 };
    const transactionClient = {
      invoice: {
        findUnique: jest.fn().mockResolvedValue(invoice),
        update: jest.fn().mockResolvedValue(updatedInvoice),
      },
      membership: { findFirst: jest.fn().mockResolvedValue({ role: 'OWNER' }) },
      payment: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue(payment),
      },
      auditEvent: { create: jest.fn().mockResolvedValue({ id: 'audit-1' }) },
    };
    const service = new PaymentsService({
      $transaction: jest.fn(async (callback) => callback(transactionClient)),
    } as never);

    await expect(
      service.recordExternal('user-1', 'invoice-1', 'payment-key-123', request),
    ).resolves.toEqual({ payment, invoice: updatedInvoice });
    expect(transactionClient.invoice.update).toHaveBeenCalledWith({
      where: { id: 'invoice-1' },
      data: { paidMinor: 5_000, status: 'PAID' },
    });
    expect(transactionClient.auditEvent.create).toHaveBeenCalled();
  });

  it('returns the existing payment for a duplicate submission', async () => {
    const invoice = {
      id: 'invoice-1',
      shopId: 'shop-1',
      status: 'PAID',
      totalMinor: 5_000,
      paidMinor: 5_000,
      currency: 'USD',
    };
    const payment = {
      id: 'payment-1',
      invoiceId: 'invoice-1',
      idempotencyKey: 'payment-key-123',
    };
    const transactionClient = {
      invoice: { findUnique: jest.fn().mockResolvedValue(invoice) },
      membership: { findFirst: jest.fn().mockResolvedValue({ role: 'OWNER' }) },
      payment: {
        findUnique: jest.fn().mockResolvedValue(payment),
        create: jest.fn(),
      },
    };
    const transaction = jest.fn(async (callback) =>
      callback(transactionClient),
    );
    const service = new PaymentsService({ $transaction: transaction } as never);

    await expect(
      service.recordExternal('user-1', 'invoice-1', 'payment-key-123', request),
    ).resolves.toEqual({ payment, invoice });
    expect(transactionClient.payment.create).not.toHaveBeenCalled();
  });

  it('rejects staff without an active authorized membership', async () => {
    const transactionClient = {
      invoice: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'invoice-1',
          shopId: 'shop-1',
          status: 'OPEN',
          totalMinor: 5_000,
          paidMinor: 0,
        }),
      },
      membership: { findFirst: jest.fn().mockResolvedValue(null) },
    };
    const service = new PaymentsService({
      $transaction: jest.fn(async (callback) => callback(transactionClient)),
    } as never);

    await expect(
      service.recordExternal(
        'inactive-user',
        'invoice-1',
        'payment-key-123',
        request,
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects an amount above the remaining balance', async () => {
    const transactionClient = {
      invoice: {
        findUnique: jest.fn().mockResolvedValue({
          id: 'invoice-1',
          shopId: 'shop-1',
          status: 'PARTIALLY_PAID',
          totalMinor: 5_000,
          paidMinor: 4_000,
          currency: 'USD',
        }),
      },
      membership: { findFirst: jest.fn().mockResolvedValue({ role: 'OWNER' }) },
      payment: { findUnique: jest.fn().mockResolvedValue(null) },
    };
    const service = new PaymentsService({
      $transaction: jest.fn(async (callback) => callback(transactionClient)),
    } as never);

    await expect(
      service.recordExternal('user-1', 'invoice-1', 'payment-key-123', request),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
