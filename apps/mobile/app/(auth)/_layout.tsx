import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name="sign-in" options={{ title: 'Sign In' }} />
      <Stack.Screen name="create-shop" options={{ title: 'Create a Shop' }} />
      <Stack.Screen name="verify-otp" options={{ title: 'Verify Code' }} />
    </Stack>
  );
}
