import { Stack } from 'expo-router';

export default function MoreStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="team" />
      <Stack.Screen name="invoices" />
      <Stack.Screen name="onboarding" />
      <Stack.Screen name="service-edit" />
    </Stack>
  );
}
