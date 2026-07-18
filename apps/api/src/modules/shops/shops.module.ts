import { Module } from '@nestjs/common';
import { ShopsController } from './shops.controller';
import { ShopsService } from './shops.service';
import { ShopContextGuard } from '../../common/guards/shop-context.guard';
import { RolesGuard } from '../../common/guards/roles.guard';

@Module({
  controllers: [ShopsController],
  providers: [ShopsService, ShopContextGuard, RolesGuard],
  exports: [ShopsService],
})
export class ShopsModule {}
