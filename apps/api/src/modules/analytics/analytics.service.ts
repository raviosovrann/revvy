import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async track(event: {
    name: string;
    userId?: string;
    shopId?: string;
    properties?: Record<string, unknown>;
  }) {
    // TODO: Implement PostHog event tracking
  }
}
