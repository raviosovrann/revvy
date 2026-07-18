import { Controller, Post, Body, Headers } from '@nestjs/common';
import { PaymentsService } from './payments.service';

@Controller('webhooks')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('stripe')
  async handleStripeWebhook(
    @Body() body: Record<string, unknown>,
    @Headers('stripe-signature') signature: string,
  ) {
    return this.paymentsService.handleStripeWebhook(body, signature);
  }

  @Post('twilio')
  async handleTwilioWebhook(@Body() body: Record<string, unknown>) {
    return this.paymentsService.handleTwilioWebhook(body);
  }
}
