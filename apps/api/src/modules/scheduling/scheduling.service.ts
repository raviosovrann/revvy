import { Injectable } from '@nestjs/common';

@Injectable()
export class SchedulingService {
  async getAvailability(shopId: string, query: Record<string, string>) {
    return { shopId, slots: [] };
  }

  async createAppointment(shopId: string, data: Record<string, unknown>) {
    return { shopId, ...data, status: 'REQUESTED' };
  }

  async listByShop(shopId: string, query: Record<string, string>) {
    return { shopId, appointments: [] };
  }

  async findById(appointmentId: string) {
    return { id: appointmentId };
  }

  async update(appointmentId: string, data: Record<string, unknown>) {
    return { id: appointmentId, ...data };
  }

  async confirm(appointmentId: string) {
    return { id: appointmentId, status: 'CONFIRMED' };
  }

  async cancel(appointmentId: string, data: Record<string, unknown>) {
    return { id: appointmentId, status: 'CANCELLED', ...data };
  }

  async reschedule(appointmentId: string, data: Record<string, unknown>) {
    return { id: appointmentId, status: 'RESCHEDULED', ...data };
  }

  async checkIn(appointmentId: string) {
    return { id: appointmentId, status: 'CHECKED_IN' };
  }
}
