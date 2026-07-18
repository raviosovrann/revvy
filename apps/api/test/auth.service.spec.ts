import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../src/modules/auth/auth.service';

describe('AuthService', () => {
  const localUser = { id: 'local-user-id' };
  let getUser: jest.Mock;
  let upsert: jest.Mock;
  let service: AuthService;

  beforeEach(() => {
    getUser = jest.fn();
    upsert = jest.fn().mockResolvedValue(localUser);
    service = new AuthService(
      { auth: { getUser } } as never,
      { user: { upsert } } as never,
    );
  });

  it('validates a token with Supabase and resolves the local user', async () => {
    getUser.mockResolvedValue({
      data: {
        user: {
          id: 'provider-user-id',
          email: 'owner@example.com',
          phone: '+12125550123',
          user_metadata: { display_name: 'Owner' },
        },
      },
      error: null,
    });

    await expect(service.validateSupabaseToken('valid-token')).resolves.toEqual(
      {
        userId: 'local-user-id',
        authProviderId: 'provider-user-id',
        email: 'owner@example.com',
        phone: '+12125550123',
      },
    );
    expect(getUser).toHaveBeenCalledWith('valid-token');
    expect(upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { authProviderId: 'provider-user-id' },
      }),
    );
  });

  it.each(['expired', 'malformed'])('rejects a %s token', async (reason) => {
    getUser.mockResolvedValue({
      data: { user: null },
      error: { message: reason },
    });

    await expect(
      service.validateSupabaseToken(`${reason}-token`),
    ).rejects.toBeInstanceOf(UnauthorizedException);
    expect(upsert).not.toHaveBeenCalled();
  });
});
