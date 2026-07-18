import { ExecutionContext, ForbiddenException } from '@nestjs/common';
import { ShopContextGuard } from '../src/common/guards/shop-context.guard';

function contextFor(request: Record<string, unknown>) {
  return {
    switchToHttp: () => ({ getRequest: () => request }),
  } as ExecutionContext;
}

describe('ShopContextGuard', () => {
  it('attaches an active membership for the authenticated user and requested shop', async () => {
    const membership = { id: 'membership-1', role: 'OWNER', status: 'ACTIVE' };
    const findFirst = jest.fn().mockResolvedValue(membership);
    const guard = new ShopContextGuard({ membership: { findFirst } } as never);
    const request = {
      params: { shopId: 'shop-a' },
      user: { userId: 'user-1' },
    };

    await expect(guard.canActivate(contextFor(request))).resolves.toBe(true);
    expect(findFirst).toHaveBeenCalledWith({
      where: { shopId: 'shop-a', userId: 'user-1', status: 'ACTIVE' },
    });
    expect(request).toHaveProperty('membership', membership);
  });

  it('rejects an inactive membership', async () => {
    const guard = new ShopContextGuard({
      membership: { findFirst: jest.fn().mockResolvedValue(null) },
    } as never);
    await expect(
      guard.canActivate(
        contextFor({
          params: { shopId: 'shop-a' },
          user: { userId: 'inactive-user' },
        }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
  });

  it('rejects cross-shop access', async () => {
    const findFirst = jest.fn().mockResolvedValue(null);
    const guard = new ShopContextGuard({ membership: { findFirst } } as never);
    await expect(
      guard.canActivate(
        contextFor({
          params: { shopId: 'shop-b' },
          user: { userId: 'shop-a-user' },
        }),
      ),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(findFirst).toHaveBeenCalledWith({
      where: { shopId: 'shop-b', userId: 'shop-a-user', status: 'ACTIVE' },
    });
  });
});
