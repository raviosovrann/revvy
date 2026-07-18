import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class ShopContextGuard implements CanActivate {
  constructor(private readonly prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const shopId = request.params?.shopId;
    const userId = request.user?.userId;

    if (!shopId || !userId) {
      throw new ForbiddenException({
        code: 'SHOP_CONTEXT_REQUIRED',
        message: 'An authenticated shop context is required.',
      });
    }

    const membership = await this.prisma.membership.findFirst({
      where: { shopId, userId, status: 'ACTIVE' },
    });

    if (!membership) {
      throw new ForbiddenException({
        code: 'ACTIVE_MEMBERSHIP_REQUIRED',
        message: 'No active membership exists for this shop.',
      });
    }

    request.membership = membership;
    return true;
  }
}
