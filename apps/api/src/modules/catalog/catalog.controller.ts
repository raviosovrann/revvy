import { Controller, Get, Post, Patch, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CatalogService } from './catalog.service';

@Controller()
@UseGuards(AuthGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get('shops/:shopId/services')
  listServices(@Param('shopId') shopId: string) {
    return this.catalogService.listByShop(shopId);
  }

  @Post('shops/:shopId/services')
  createService(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.catalogService.create(shopId, body);
  }

  @Get('shops/:shopId/services/:serviceId')
  getService(@Param('shopId') shopId: string, @Param('serviceId') serviceId: string) {
    return this.catalogService.findById(shopId, serviceId);
  }

  @Patch('shops/:shopId/services/:serviceId')
  updateService(
    @Param('shopId') shopId: string,
    @Param('serviceId') serviceId: string,
    @Body() body: Record<string, unknown>,
  ) {
    return this.catalogService.update(shopId, serviceId, body);
  }

  @Post('shops/:shopId/services/:serviceId/archive')
  archiveService(@Param('shopId') shopId: string, @Param('serviceId') serviceId: string) {
    return this.catalogService.archive(shopId, serviceId);
  }
}

@Controller('public/shops/:shopId/services')
export class PublicCatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  listPublicServices(@Param('shopId') shopId: string) {
    return this.catalogService.listPublic(shopId);
  }
}
