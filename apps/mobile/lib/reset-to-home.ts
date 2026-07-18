import { useRouter } from 'expo-router';
import { useAuthStore } from './auth-store';

export function useResetToHome() {
  const router = useRouter();
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return () => {
    if (__DEV__) router.replace('/role-picker');
    else void clearAuth().finally(() => router.replace('/(auth)/sign-in'));
  };
}
