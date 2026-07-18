import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateSupabaseToken(token: string): Promise<{ userId: string; email?: string; phone?: string }> {
    // TODO: Implement Supabase JWT validation in Phase 1
    return { userId: 'placeholder' };
  }
}
