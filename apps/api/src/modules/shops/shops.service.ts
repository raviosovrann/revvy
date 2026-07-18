import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  CreateShopRequest,
  IdempotencyKeySchema,
  UpdateShopRequest,
} from '@revvy/contracts';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ShopsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    userId: string,
    rawIdempotencyKey: string | undefined,
    data: CreateShopRequest,
  ) {
    const parsedKey = IdempotencyKeySchema.safeParse(rawIdempotencyKey);
    if (!parsedKey.success) {
      throw new BadRequestException({
        code: 'IDEMPOTENCY_KEY_REQUIRED',
        message:
          'A valid Idempotency-Key header is required for shop creation.',
        fieldErrors: [
          { field: 'Idempotency-Key', message: 'Use 8-128 safe characters.' },
        ],
      });
    }
    const idempotencyKey = parsedKey.data;

    const existing = await this.findIdempotentShop(idempotencyKey, userId);
    if (existing) return existing;

    try {
      return await this.prisma.$transaction(async (transaction) => {
        const shop = await transaction.shop.create({
          data: {
            ...data,
            creationIdempotencyKey: idempotencyKey,
            memberships: {
              create: { userId, role: 'OWNER', status: 'ACTIVE' },
            },
            onboarding: { create: { shopProfileComplete: true } },
            subscription: {
              create: {
                planName: 'STARTER',
                status: 'TRIALING',
                trialEndsAt: new Date(Date.now() + 14 * 24 * 60 * 60 * 1_000),
              },
            },
          },
          include: {
            memberships: {
              where: { userId },
              select: { id: true, role: true, status: true },
            },
            onboarding: true,
            subscription: true,
          },
        });
        return shop;
      });
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        const retried = await this.findIdempotentShop(idempotencyKey, userId);
        if (retried) return retried;
      }
      throw error;
    }
  }

  private async findIdempotentShop(idempotencyKey: string, userId: string) {
    const shop = await this.prisma.shop.findUnique({
      where: { creationIdempotencyKey: idempotencyKey },
      include: {
        memberships: {
          where: { userId },
          select: { id: true, role: true, status: true },
        },
        onboarding: true,
        subscription: true,
      },
    });
    if (!shop) return null;
    if (shop.memberships.length === 0) {
      throw new ConflictException({
        code: 'IDEMPOTENCY_KEY_CONFLICT',
        message: 'This idempotency key belongs to another operation.',
      });
    }
    return shop;
  }

  async findById(shopId: string) {
    const shop = await this.prisma.shop.findUnique({ where: { id: shopId } });
    if (!shop) throw new NotFoundException('Shop not found.');
    return shop;
  }

  update(shopId: string, data: UpdateShopRequest) {
    return this.prisma.shop.update({ where: { id: shopId }, data });
  }

  async publish(shopId: string) {
    const serviceCount = await this.prisma.service.count({
      where: { shopId, active: true, bookingAvailable: true },
    });
    if (serviceCount === 0) {
      throw new ConflictException({
        code: 'PUBLISHED_SERVICE_REQUIRED',
        message:
          'Publish at least one bookable service before publishing the shop.',
      });
    }
    return this.prisma.shop.update({
      where: { id: shopId },
      data: { status: 'PUBLISHED' },
    });
  }

  pause(shopId: string) {
    return this.prisma.shop.update({
      where: { id: shopId },
      data: { status: 'PAUSED' },
    });
  }
}
