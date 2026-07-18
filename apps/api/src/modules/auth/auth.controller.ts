import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UpdateProfileRequest, UpdateProfileSchema } from '@revvy/contracts';
import { AuthGuard } from '../../common/guards/auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { AuthenticatedUser } from '../../common/types/authenticated-user';
import { AuthService } from './auth.service';

@Controller()
@UseGuards(AuthGuard)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  getProfile(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.getProfile(user.userId);
  }

  @Patch('me')
  updateProfile(
    @CurrentUser() user: AuthenticatedUser,
    @Body(new ZodValidationPipe(UpdateProfileSchema))
    body: UpdateProfileRequest,
  ) {
    return this.authService.updateProfile(user.userId, body);
  }

  @Get('me/shops')
  getMyShops(@CurrentUser() user: AuthenticatedUser) {
    return this.authService.getShops(user.userId);
  }
}
