import { Controller, Get, Post, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { InvoicesService } from './invoices.service';

@Controller()
@UseGuards(AuthGuard)
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post('work-orders/:workOrderId/invoices')
  create(@Param('workOrderId') workOrderId: string, @Body() body: Record<string, unknown>) {
    return this.invoicesService.create(workOrderId, body);
  }

  @Get('invoices/:invoiceId')
  get(@Param('invoiceId') invoiceId: string) {
    return this.invoicesService.findById(invoiceId);
  }

  @Post('invoices/:invoiceId/send')
  send(@Param('invoiceId') invoiceId: string) {
    return this.invoicesService.send(invoiceId);
  }

  @Post('invoices/:invoiceId/payment-session')
  createPaymentSession(@Param('invoiceId') invoiceId: string) {
    return this.invoicesService.createPaymentSession(invoiceId);
  }
}
