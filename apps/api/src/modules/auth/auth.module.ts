import { Global, Module } from '@nestjs/common';
import { AuthGuard } from '../../common/guards/auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { ShopContextGuard } from '../../common/guards/shop-context.guard';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SupabaseAuthProvider } from './supabase-auth.provider';

@Global()
@Module({
  controllers: [AuthController],
  providers: [
    SupabaseAuthProvider,
    AuthService,
    AuthGuard,
    ShopContextGuard,
    RolesGuard,
  ],
  exports: [AuthService, AuthGuard, ShopContextGuard, RolesGuard],
})
export class AuthModule {}
