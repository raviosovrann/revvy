import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { ShopsModule } from './modules/shops/shops.module';
import { MembershipsModule } from './modules/memberships/memberships.module';
import { CustomersModule } from './modules/customers/customers.module';
import { CatalogModule } from './modules/catalog/catalog.module';
import { SchedulingModule } from './modules/scheduling/scheduling.module';
import { WorkOrdersModule } from './modules/work-orders/work-orders.module';
import { EstimatesModule } from './modules/estimates/estimates.module';
import { InvoicesModule } from './modules/invoices/invoices.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { SubscriptionsModule } from './modules/subscriptions/subscriptions.module';
import { FilesModule } from './modules/files/files.module';
import { AuditModule } from './modules/audit/audit.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    ShopsModule,
    MembershipsModule,
    CustomersModule,
    CatalogModule,
    SchedulingModule,
    WorkOrdersModule,
    EstimatesModule,
    InvoicesModule,
    PaymentsModule,
    NotificationsModule,
    SubscriptionsModule,
    FilesModule,
    AuditModule,
    AnalyticsModule,
  ],
})
export class AppModule {}
