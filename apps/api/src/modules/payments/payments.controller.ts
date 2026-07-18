import {
  Body,
  Controller,
  Headers,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  RecordExternalPaymentRequest,
  RecordExternalPaymentSchema,
} from '@revvy/contracts';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { PaymentsService } from './payments.service';

@Controller('invoices/:invoiceId/payments')
@UseGuards(AuthGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('external')
  recordExternalPayment(
    @CurrentUser() user: AuthenticatedUser,
    @Param('invoiceId') invoiceId: string,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Body(new ZodValidationPipe(RecordExternalPaymentSchema))
    body: RecordExternalPaymentRequest,
  ) {
    return this.paymentsService.recordExternal(
      user.userId,
      invoiceId,
      idempotencyKey,
      body,
    );
  }
}
