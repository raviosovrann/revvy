import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing or invalid authorization header.');
    }

    const token = authHeader.substring(7);

    try {
      const user = await this.validateToken(token);
      request.user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token.');
    }
  }

  private async validateToken(token: string): Promise<{ userId: string; email?: string; phone?: string }> {
    // TODO: Implement Supabase JWT validation
    // For now, this is a placeholder that will be completed in Phase 1
    if (!token) {
      throw new Error('Token validation not yet implemented');
    }
    return { userId: 'placeholder' };
  }
}
