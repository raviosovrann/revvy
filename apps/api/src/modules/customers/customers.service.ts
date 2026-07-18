import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomersService {
  async listByShop(shopId: string) {
    return { shopId, customers: [] };
  }

  async create(shopId: string, data: Record<string, unknown>) {
    return { shopId, ...data };
  }

  async findById(shopId: string, customerId: string) {
    return { shopId, id: customerId };
  }

  async listMyVehicles() {
    return { vehicles: [] };
  }

  async createVehicle(data: Record<string, unknown>) {
    return { ...data };
  }

  async updateVehicle(vehicleId: string, data: Record<string, unknown>) {
    return { id: vehicleId, ...data };
  }

  async deleteVehicle(vehicleId: string) {
    return { id: vehicleId, deleted: true };
  }

  async listCustomerVehicles(shopId: string, customerId: string) {
    return { shopId, customerId, vehicles: [] };
  }
}
