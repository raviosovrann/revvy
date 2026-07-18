import { Redirect } from 'expo-router';
import { useAuthStore } from '@/lib/auth-store';

export default function IndexScreen() {
  const { isInitialized, isAuthenticated, activeShop } = useAuthStore();
  const demoRolePickerEnabled =
    __DEV__ && process.env.EXPO_PUBLIC_ENABLE_ROLE_PICKER !== 'false';

  if (demoRolePickerEnabled) return <Redirect href="/role-picker" />;
  if (!isInitialized) return null;
  if (!isAuthenticated) return <Redirect href="/(auth)/sign-in" />;
  if (activeShop?.role === 'TECHNICIAN') return <Redirect href="/(tech)" />;
  if (activeShop) return <Redirect href="/(owner)" />;
  return <Redirect href="/(customer)" />;
}
