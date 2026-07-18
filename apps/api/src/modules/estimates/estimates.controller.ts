import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { EstimatesService } from './estimates.service';

@Controller()
@UseGuards(AuthGuard)
export class EstimatesController {
  constructor(private readonly estimatesService: EstimatesService) {}

  @Post('work-orders/:workOrderId/estimates')
  create(@Param('workOrderId') workOrderId: string, @Body() body: Record<string, unknown>) {
    return this.estimatesService.create(workOrderId, body);
  }

  @Get('estimates/:estimateId')
  get(@Param('estimateId') estimateId: string) {
    return this.estimatesService.findById(estimateId);
  }

  @Post('estimates/:estimateId/send')
  send(@Param('estimateId') estimateId: string) {
    return this.estimatesService.send(estimateId);
  }

  @Post('estimates/:estimateId/approve')
  approve(@Param('estimateId') estimateId: string, @Body() body: Record<string, unknown>) {
    return this.estimatesService.approve(estimateId, body);
  }

  @Post('estimates/:estimateId/reject')
  reject(@Param('estimateId') estimateId: string, @Body() body: Record<string, unknown>) {
    return this.estimatesService.reject(estimateId, body);
  }
}
