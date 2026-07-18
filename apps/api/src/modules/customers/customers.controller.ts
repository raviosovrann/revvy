import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CustomersService } from './customers.service';

@Controller()
@UseGuards(AuthGuard)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Get('shops/:shopId/customers')
  listCustomers(@Param('shopId') shopId: string) {
    return this.customersService.listByShop(shopId);
  }

  @Post('shops/:shopId/customers')
  createCustomer(@Param('shopId') shopId: string, @Body() body: Record<string, unknown>) {
    return this.customersService.create(shopId, body);
  }

  @Get('shops/:shopId/customers/:customerId')
  getCustomer(@Param('shopId') shopId: string, @Param('customerId') customerId: string) {
    return this.customersService.findById(shopId, customerId);
  }

  @Get('me/vehicles')
  listMyVehicles() {
    return this.customersService.listMyVehicles();
  }

  @Post('me/vehicles')
  createVehicle(@Body() body: Record<string, unknown>) {
    return this.customersService.createVehicle(body);
  }

  @Patch('me/vehicles/:vehicleId')
  updateVehicle(@Param('vehicleId') vehicleId: string, @Body() body: Record<string, unknown>) {
    return this.customersService.updateVehicle(vehicleId, body);
  }

  @Delete('me/vehicles/:vehicleId')
  deleteVehicle(@Param('vehicleId') vehicleId: string) {
    return this.customersService.deleteVehicle(vehicleId);
  }

  @Get('shops/:shopId/customers/:customerId/vehicles')
  listCustomerVehicles(@Param('shopId') shopId: string, @Param('customerId') customerId: string) {
    return this.customersService.listCustomerVehicles(shopId, customerId);
  }
}
