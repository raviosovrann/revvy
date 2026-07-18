import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { SubscriptionsService } from './subscriptions.service';

@Controller('shops/:shopId/subscription')
@UseGuards(AuthGuard)
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get()
  getSubscription(@Param('shopId') shopId: string) {
    return this.subscriptionsService.getByShop(shopId);
  }

  @Post('checkout')
  createCheckout(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.subscriptionsService.createCheckout(shopId, body);
  }

  @Post('change-plan')
  changePlan(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.subscriptionsService.changePlan(shopId, body);
  }

  @Post('cancel')
  cancelSubscription(@Param('shopId') shopId: string) {
    return this.subscriptionsService.cancel(shopId);
  }
}

@Controller('shops/:shopId/stripe-connect')
@UseGuards(AuthGuard)
export class StripeConnectController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post('onboarding')
  createConnectOnboarding(@Param('shopId') shopId: string) {
    return this.subscriptionsService.createConnectOnboarding(shopId);
  }
}
