import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { WorkOrdersService } from './work-orders.service';

@Controller()
@UseGuards(AuthGuard)
export class WorkOrdersController {
  constructor(private readonly workOrdersService: WorkOrdersService) {}

  @Post('shops/:shopId/work-orders')
  create(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.workOrdersService.create(shopId, body);
  }

  @Get('shops/:shopId/work-orders')
  list(@Param('shopId') shopId: string, @Query() query: Record<string, string>) {
    return this.workOrdersService.listByShop(shopId, query);
  }

  @Get('work-orders/:workOrderId')
  get(@Param('workOrderId') workOrderId: string) {
    return this.workOrdersService.findById(workOrderId);
  }

  @Patch('work-orders/:workOrderId/status')
  updateStatus(@Param('workOrderId') workOrderId: string, @Body() body: Record<string, unknown>) {
    return this.workOrdersService.updateStatus(workOrderId, body);
  }

  @Post('work-orders/:workOrderId/assign')
  assign(@Param('workOrderId') workOrderId: string, @Body() body: Record<string, unknown>) {
    return this.workOrdersService.assign(workOrderId, body);
  }

  @Post('work-orders/:workOrderId/notes')
  addNote(@Param('workOrderId') workOrderId: string, @Body() body: Record<string, unknown>) {
    return this.workOrdersService.addNote(workOrderId, body);
  }

  @Post('work-orders/:workOrderId/media')
  addMedia(@Param('workOrderId') workOrderId: string, @Body() body: Record<string, unknown>) {
    return this.workOrdersService.addMedia(workOrderId, body);
  }
}
