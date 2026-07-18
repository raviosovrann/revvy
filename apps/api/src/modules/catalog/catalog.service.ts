import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateServiceRequest, UpdateServiceRequest } from '@revvy/contracts';
import { PrismaService } from '../../database/prisma.service';

@Injectable()
export class CatalogService {
  constructor(private readonly prisma: PrismaService) {}

  async listByShop(shopId: string) {
    const services = await this.prisma.service.findMany({
      where: { shopId },
      orderBy: { createdAt: 'asc' },
    });
    return { shopId, services };
  }

  async create(shopId: string, data: CreateServiceRequest) {
    const service = await this.prisma.service.create({
      data: { shopId, ...data },
    });
    if (service.active && service.bookingAvailable) {
      await this.markOnboardingComplete(shopId);
    }
    return service;
  }

  async findById(shopId: string, serviceId: string) {
    const service = await this.prisma.service.findFirst({
      where: { id: serviceId, shopId },
    });
    if (!service) throw new NotFoundException('Service not found.');
    return service;
  }

  async update(shopId: string, serviceId: string, data: UpdateServiceRequest) {
    await this.findById(shopId, serviceId);
    const service = await this.prisma.service.update({
      where: { id: serviceId },
      data: {
        ...(data.priceType
          ? {
              priceMinor: null,
              startingPriceMinor: null,
              inspectionFeeMinor: null,
            }
          : {}),
        ...data,
      },
    });
    if (service.active && service.bookingAvailable) {
      await this.markOnboardingComplete(shopId);
    }
    return service;
  }

  async publish(shopId: string, serviceId: string) {
    await this.findById(shopId, serviceId);
    const service = await this.prisma.service.update({
      where: { id: serviceId },
      data: { active: true, bookingAvailable: true },
    });
    await this.markOnboardingComplete(shopId);
    return service;
  }

  async archive(shopId: string, serviceId: string) {
    await this.findById(shopId, serviceId);
    return this.prisma.service.update({
      where: { id: serviceId },
      data: { active: false, bookingAvailable: false },
    });
  }

  async listPublic(shopId: string) {
    const services = await this.prisma.service.findMany({
      where: {
        shopId,
        active: true,
        bookingAvailable: true,
        shop: { status: 'PUBLISHED' },
      },
      orderBy: { name: 'asc' },
    });
    return { shopId, services };
  }

  private markOnboardingComplete(shopId: string) {
    return this.prisma.shopOnboarding.update({
      where: { shopId },
      data: { serviceAdded: true },
    });
  }
}
