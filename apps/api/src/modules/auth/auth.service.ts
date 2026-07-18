import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { UpdateProfileRequest } from '@revvy/contracts';
import { PrismaService } from '../../database/prisma.service';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { SUPABASE_AUTH_CLIENT } from './supabase-auth.provider';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_AUTH_CLIENT) private readonly supabase: SupabaseClient,
    private readonly prisma: PrismaService,
  ) {}

  async validateSupabaseToken(token: string): Promise<AuthenticatedUser> {
    const { data, error } = await this.supabase.auth.getUser(token);
    if (error || !data.user) {
      throw new UnauthorizedException({
        code: 'INVALID_ACCESS_TOKEN',
        message: 'The access token is malformed, expired, or no longer valid.',
      });
    }

    const providerUser = data.user;
    const displayName =
      (typeof providerUser.user_metadata?.display_name === 'string' &&
        providerUser.user_metadata.display_name) ||
      (typeof providerUser.user_metadata?.full_name === 'string' &&
        providerUser.user_metadata.full_name) ||
      providerUser.email ||
      providerUser.phone ||
      'Revvy user';

    const user = await this.prisma.user.upsert({
      where: { authProviderId: providerUser.id },
      create: {
        authProviderId: providerUser.id,
        displayName,
        email: providerUser.email,
        phone: providerUser.phone,
      },
      update: {
        email: providerUser.email,
        phone: providerUser.phone,
      },
    });

    return {
      userId: user.id,
      authProviderId: providerUser.id,
      email: providerUser.email,
      phone: providerUser.phone,
    };
  }

  getProfile(userId: string) {
    return this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: {
        id: true,
        displayName: true,
        email: true,
        phone: true,
        avatarUrl: true,
      },
    });
  }

  updateProfile(userId: string, data: UpdateProfileRequest) {
    return this.prisma.user.update({
      where: { id: userId },
      data,
      select: {
        id: true,
        displayName: true,
        email: true,
        phone: true,
        avatarUrl: true,
      },
    });
  }

  async getShops(userId: string) {
    const memberships = await this.prisma.membership.findMany({
      where: { userId, status: 'ACTIVE' },
      include: { shop: true },
      orderBy: { joinedAt: 'asc' },
    });

    return {
      shops: memberships.map((membership) => ({
        shopId: membership.shopId,
        shopName: membership.shop.name,
        role: membership.role,
        status: membership.shop.status,
      })),
    };
  }
}
