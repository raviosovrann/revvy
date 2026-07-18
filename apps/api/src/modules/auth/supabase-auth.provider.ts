import { ConfigService } from '@nestjs/config';
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_AUTH_CLIENT = Symbol('SUPABASE_AUTH_CLIENT');

export const SupabaseAuthProvider = {
  provide: SUPABASE_AUTH_CLIENT,
  inject: [ConfigService],
  useFactory: (config: ConfigService) =>
    createClient(
      config.getOrThrow<string>('AUTH_PROVIDER_URL'),
      config.getOrThrow<string>('AUTH_PROVIDER_PUBLIC_KEY'),
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
      },
    ),
};
