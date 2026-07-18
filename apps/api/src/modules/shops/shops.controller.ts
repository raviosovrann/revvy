import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { ShopsService } from './shops.service';

@Controller('shops')
@UseGuards(AuthGuard)
export class ShopsController {
  constructor(private readonly shopsService: ShopsService) {}

  @Post()
  createShop(@Body() body: Record<string, unknown>) {
    return this.shopsService.create(body);
  }

  @Get(':shopId')
  getShop(@Param('shopId') shopId: string) {
    return this.shopsService.findById(shopId);
  }

  @Patch(':shopId')
  updateShop(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.shopsService.update(shopId, body);
  }

  @Post(':shopId/publish')
  publishShop(@Param('shopId') shopId: string) {
    return this.shopsService.publish(shopId);
  }

  @Post(':shopId/pause')
  pauseShop(@Param('shopId') shopId: string) {
    return this.shopsService.pause(shopId);
  }
}
