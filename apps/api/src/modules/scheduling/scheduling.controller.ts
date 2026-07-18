import { Controller, Get, Post, Patch, Param, Body, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { SchedulingService } from './scheduling.service';

@Controller()
@UseGuards(AuthGuard)
export class SchedulingController {
  constructor(private readonly schedulingService: SchedulingService) {}

  @Get('public/shops/:shopId/availability')
  getAvailability(@Param('shopId') shopId: string, @Query() query: Record<string, string>) {
    return this.schedulingService.getAvailability(shopId, query);
  }

  @Post('shops/:shopId/appointments')
  createAppointment(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.schedulingService.createAppointment(shopId, body);
  }

  @Get('shops/:shopId/appointments')
  listAppointments(@Param('shopId') shopId: string, @Query() query: Record<string, string>) {
    return this.schedulingService.listByShop(shopId, query);
  }

  @Get('appointments/:appointmentId')
  getAppointment(@Param('appointmentId') appointmentId: string) {
    return this.schedulingService.findById(appointmentId);
  }

  @Patch('appointments/:appointmentId')
  updateAppointment(@Param('appointmentId') appointmentId: string, @Body() body: Record<string, unknown>) {
    return this.schedulingService.update(appointmentId, body);
  }

  @Post('appointments/:appointmentId/confirm')
  confirmAppointment(@Param('appointmentId') appointmentId: string) {
    return this.schedulingService.confirm(appointmentId);
  }

  @Post('appointments/:appointmentId/cancel')
  cancelAppointment(@Param('appointmentId') appointmentId: string, @Body() body: Record<string, unknown>) {
    return this.schedulingService.cancel(appointmentId, body);
  }

  @Post('appointments/:appointmentId/reschedule')
  rescheduleAppointment(@Param('appointmentId') appointmentId: string, @Body() body: Record<string, unknown>) {
    return this.schedulingService.reschedule(appointmentId, body);
  }

  @Post('appointments/:appointmentId/check-in')
  checkInAppointment(@Param('appointmentId') appointmentId: string) {
    return this.schedulingService.checkIn(appointmentId);
  }
}
