import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkOrdersService {
  async create(shopId: string, data: Record<string, unknown>) {
    return { shopId, ...data, status: 'DRAFT' };
  }

  async listByShop(shopId: string, query: Record<string, string>) {
    return { shopId, workOrders: [] };
  }

  async findById(workOrderId: string) {
    return { id: workOrderId };
  }

  async updateStatus(workOrderId: string, data: Record<string, unknown>) {
    return { id: workOrderId, ...data };
  }

  async assign(workOrderId: string, data: Record<string, unknown>) {
    return { id: workOrderId, ...data };
  }

  async addNote(workOrderId: string, data: Record<string, unknown>) {
    return { workOrderId, ...data };
  }

  async addMedia(workOrderId: string, data: Record<string, unknown>) {
    return { workOrderId, ...data };
  }
}
