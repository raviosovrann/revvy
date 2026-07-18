import { Injectable } from '@nestjs/common';

@Injectable()
export class SubscriptionsService {
  async getByShop(shopId: string) {
    return { shopId, status: 'TRIALING' };
  }

  async createCheckout(shopId: string, data: Record<string, unknown>) {
    return { shopId, checkoutUrl: null };
  }

  async changePlan(shopId: string, data: Record<string, unknown>) {
    return { shopId, ...data };
  }

  async cancel(shopId: string) {
    return { shopId, status: 'CANCELLED' };
  }

  async createConnectOnboarding(shopId: string) {
    return { shopId, onboardingUrl: null };
  }
}
