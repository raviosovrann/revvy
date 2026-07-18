import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimatesService {
  async create(workOrderId: string, data: Record<string, unknown>) {
    return { workOrderId, ...data, status: 'DRAFT' };
  }

  async findById(estimateId: string) {
    return { id: estimateId };
  }

  async send(estimateId: string) {
    return { id: estimateId, status: 'SENT' };
  }

  async approve(estimateId: string, data: Record<string, unknown>) {
    return { id: estimateId, status: 'APPROVED', ...data };
  }

  async reject(estimateId: string, data: Record<string, unknown>) {
    return { id: estimateId, status: 'REJECTED', ...data };
  }
}
