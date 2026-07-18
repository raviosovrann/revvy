import { Injectable } from '@nestjs/common';

@Injectable()
export class CatalogService {
  async listByShop(shopId: string) {
    return { shopId, services: [] };
  }

  async create(shopId: string, data: Record<string, unknown>) {
    return { shopId, ...data };
  }

  async findById(shopId: string, serviceId: string) {
    return { shopId, id: serviceId };
  }

  async update(shopId: string, serviceId: string, data: Record<string, unknown>) {
    return { shopId, id: serviceId, ...data };
  }

  async archive(shopId: string, serviceId: string) {
    return { shopId, id: serviceId, active: false };
  }

  async listPublic(shopId: string) {
    return { shopId, services: [] };
  }
}
