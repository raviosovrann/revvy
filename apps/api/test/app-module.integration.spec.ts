import { Test } from '@nestjs/testing';
import { PrismaService } from '../src/database/prisma.service';
import { AuthService } from '../src/modules/auth/auth.service';
import { PaymentsService } from '../src/modules/payments/payments.service';
import { ShopsService } from '../src/modules/shops/shops.service';

describe('AppModule integration', () => {
  it('resolves the production foundation through Nest dependency injection', async () => {
    process.env.NODE_ENV = 'test';
    process.env.DATABASE_URL =
      'postgresql://postgres:postgres@localhost:5432/revvy_test';
    process.env.DIRECT_DATABASE_URL = process.env.DATABASE_URL;
    process.env.AUTH_PROVIDER_URL = 'https://example.supabase.co';
    process.env.AUTH_PROVIDER_PUBLIC_KEY = 'test-placeholder-key';
    const { AppModule } = await import('../src/app.module');

    const module = await Test.createTestingModule({ imports: [AppModule] })
      .overrideProvider(PrismaService)
      .useValue({})
      .compile();

    expect(module.get(AuthService)).toBeInstanceOf(AuthService);
    expect(module.get(ShopsService)).toBeInstanceOf(ShopsService);
    expect(module.get(PaymentsService)).toBeInstanceOf(PaymentsService);
    await module.close();
  });
});
