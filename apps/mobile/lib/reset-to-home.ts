import { useRouter } from 'expo-router';

export function useResetToHome() {
  const router = useRouter();

  return () => router.replace('/role-picker');
}
