import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateServiceRequest,
  CreateServiceSchema,
  UpdateServiceRequest,
  UpdateServiceSchema,
} from '@revvy/contracts';
import { Roles } from '../../common/decorators/roles.decorator';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ShopContextGuard } from '../../common/guards/shop-context.guard';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { CatalogService } from './catalog.service';

@Controller('shops/:shopId/services')
@Roles('OWNER', 'MANAGER')
@UseGuards(AuthGuard, ShopContextGuard, RolesGuard)
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @Get()
  listServices(@Param('shopId') shopId: string) {
    return this.catalogService.listByShop(shopId);
  }

  @Post()
  createService(
    @Param('shopId') shopId: string,
    @Body(new ZodValidationPipe(CreateServiceSchema))
    body: CreateServiceRequest,
  ) {
    return this.catalogService.create(shopId, body);
  }

  @Get(':serviceId')
  getService(
    @Param('shopId') shopId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.catalogService.findById(shopId, serviceId);
  }

  @Patch(':serviceId')
  updateService(
    @Param('shopId') shopId: string,
    @Param('serviceId') serviceId: string,
    @Body(new ZodValidationPipe(UpdateServiceSchema))
    body: UpdateServiceRequest,
  ) {
    return this.catalogService.update(shopId, serviceId, body);
  }

  @Post(':serviceId/publish')
  publishService(
    @Param('shopId') shopId: string,
    @Param('serviceId') serviceId: string,
  ) {
    return this.catalogService.publish(shopId, serviceId);
  }

  @Post(':serviceId/archive')
  archiveService(
    @Param('shopId') shopId: string,
    @Param('serviceId') serviceId: string,
  ) {
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
