import { Controller, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller()
@UseGuards(AuthGuard)
export class AuthController {
  @Get('me')
  getProfile(@CurrentUser() user: { userId: string }) {
    return { userId: user.userId };
  }

  @Patch('me')
  updateProfile(@CurrentUser() user: { userId: string }, @Body() body: Record<string, unknown>) {
    return { userId: user.userId, ...body };
  }

  @Get('me/shops')
  getMyShops(@CurrentUser() user: { userId: string }) {
    return { userId: user.userId, shops: [] };
  }
}
