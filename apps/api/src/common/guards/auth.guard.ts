import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (
      typeof authorization !== 'string' ||
      !authorization.startsWith('Bearer ')
    ) {
      throw new UnauthorizedException({
        code: 'AUTHORIZATION_REQUIRED',
        message: 'A Bearer access token is required.',
      });
    }

    const token = authorization.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException({
        code: 'AUTHORIZATION_REQUIRED',
        message: 'A Bearer access token is required.',
      });
    }

    request.user = await this.authService.validateSupabaseToken(token);
    return true;
  }
}
