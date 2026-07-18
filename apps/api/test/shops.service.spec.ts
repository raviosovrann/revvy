import { BadRequestException, ConflictException } from '@nestjs/common';
import { ShopsService } from '../src/modules/shops/shops.service';

const shopRequest = {
  name: 'Queens Auto',
  address: '1 Main Street, Queens, NY',
  timezone: 'America/New_York',
};

describe('ShopsService', () => {
  it('returns the same shop when creation is retried with the same key', async () => {
    const shop = {
      id: 'shop-1',
      creationIdempotencyKey: 'shop-create-123',
      memberships: [{ id: 'membership-1', role: 'OWNER', status: 'ACTIVE' }],
      onboarding: {},
      subscription: {},
    };
    const findUnique = jest
      .fn()
      .mockResolvedValueOnce(null)
      .mockResolvedValueOnce(shop);
    const create = jest.fn().mockResolvedValue(shop);
    const transaction = jest.fn(async (callback) =>
      callback({ shop: { create } }),
    );
    const service = new ShopsService({
      shop: { findUnique },
      $transaction: transaction,
    } as never);

    const first = await service.create(
      'user-1',
      'shop-create-123',
      shopRequest,
    );
    const retry = await service.create(
      'user-1',
      'shop-create-123',
      shopRequest,
    );

    expect(first).toBe(shop);
    expect(retry).toBe(shop);
    expect(create).toHaveBeenCalledTimes(1);
    expect(transaction).toHaveBeenCalledTimes(1);
  });

  it('requires an idempotency key', async () => {
    const service = new ShopsService({} as never);
    await expect(
      service.create('user-1', undefined, shopRequest),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('does not expose an operation owned by another user', async () => {
    const service = new ShopsService({
      shop: {
        findUnique: jest
          .fn()
          .mockResolvedValue({ id: 'shop-1', memberships: [] }),
      },
    } as never);
    await expect(
      service.create('user-2', 'shop-create-123', shopRequest),
    ).rejects.toBeInstanceOf(ConflictException);
  });
});
