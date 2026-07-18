import { Injectable } from '@nestjs/common';

@Injectable()
export class InvoicesService {
  async create(workOrderId: string, data: Record<string, unknown>) {
    return { workOrderId, ...data, status: 'DRAFT' };
  }

  async findById(invoiceId: string) {
    return { id: invoiceId };
  }

  async send(invoiceId: string) {
    return { id: invoiceId, status: 'OPEN' };
  }

  async createPaymentSession(invoiceId: string) {
    return { invoiceId, clientSecret: null };
  }
}
