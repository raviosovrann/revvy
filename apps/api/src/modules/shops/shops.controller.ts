import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateShopRequest,
  CreateShopSchema,
  UpdateShopRequest,
  UpdateShopSchema,
} from '@revvy/contracts';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ShopContextGuard } from '../../common/guards/shop-context.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseGuards(AuthGuard)
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  createShop(
    @CurrentUser() user: AuthenticatedUser,
    @Headers('idempotency-key') idempotencyKey: string | undefined,
    @Body(new ZodValidationPipe(CreateShopSchema)) body: CreateShopRequest,
  ) {
    return this.shopsService.create(user.userId, idempotencyKey, body);
  }

  @Get(':shopId')
  @UseGuards(ShopContextGuard)
  getShop(@Param('shopId') shopId: string) {
    return this.shopsService.findById(shopId);
  }

  @Patch(':shopId')
  @Roles('OWNER', 'MANAGER')
  @UseGuards(ShopContextGuard, RolesGuard)
  updateShop(
    @Param('shopId') shopId: string,
    @Body(new ZodValidationPipe(UpdateShopSchema)) body: UpdateShopRequest,
  ) {
    return this.shopsService.update(shopId, body);
  }

  @Post(':shopId/publish')
  @Roles('OWNER', 'MANAGER')
  @UseGuards(ShopContextGuard, RolesGuard)
  publishShop(@Param('shopId') shopId: string) {
    return this.shopsService.publish(shopId);
  }

  @Post(':shopId/pause')
  @Roles('OWNER', 'MANAGER')
  @UseGuards(ShopContextGuard, RolesGuard)
  pauseShop(@Param('shopId') shopId: string) {
    return this.shopsService.pause(shopId);
  }
}
