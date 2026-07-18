import { Injectable } from '@nestjs/common';

@Injectable()
export class PaymentsService {
  async handleStripeWebhook(body: Record<string, unknown>, signature: string) {
    // TODO: Verify signature, check idempotency, process event
    return { received: true };
  }

  async handleTwilioWebhook(body: Record<string, unknown>) {
    return { received: true };
  }
}
