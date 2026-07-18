import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { CreateShopRequest } from '@revvy/contracts';
import { colors, spacing, typography } from '@/constants/theme';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/lib/auth-store';

function createIdempotencyKey() {
  return `shop-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
}

export default function CreateShopScreen() {
  const router = useRouter();
  const refreshShops = useAuthStore((state) => state.refreshShops);
  const idempotencyKey = useRef(createIdempotencyKey());
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [timezone, setTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone || 'America/New_York',
  );
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleCreate = async () => {
    if (!name.trim() || !address.trim() || !timezone.trim()) {
      setErrorMessage('Shop name, address, and timezone are required.');
      return;
    }
    const request: CreateShopRequest = {
      name: name.trim(),
      address: address.trim(),
      timezone: timezone.trim(),
      ...(phone.trim() ? { phone: phone.trim() } : {}),
    };
    setSubmitting(true);
    setErrorMessage(null);
    try {
      await apiClient.post('/shops', request, idempotencyKey.current);
      await refreshShops();
      router.replace('/(owner)/more/onboarding');
    } catch (error) {
      const message =
        typeof error === 'object' && error && 'error' in error
          ? String(
              (error as { error?: { message?: string } }).error?.message ||
                'Shop creation failed.',
            )
          : 'Shop creation failed.';
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>
          <Text style={styles.title}>Create a Shop</Text>
          <Text style={styles.description}>
            Set up the business workspace you own or are authorized to operate.
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Shop name"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={setName}
            autoFocus
          />
          <TextInput
            style={styles.input}
            placeholder="Street address"
            placeholderTextColor={colors.textMuted}
            value={address}
            onChangeText={setAddress}
          />
          <TextInput
            style={styles.input}
            placeholder="Shop phone (optional)"
            placeholderTextColor={colors.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
          <TextInput
            style={styles.input}
            placeholder="Timezone"
            placeholderTextColor={colors.textMuted}
            value={timezone}
            onChangeText={setTimezone}
            autoCapitalize="none"
          />
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <TouchableOpacity
            style={[styles.button, submitting && styles.buttonDisabled]}
            onPress={() => void handleCreate()}
            disabled={submitting}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {submitting ? 'Creating…' : 'Create shop'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  scrollContent: { flexGrow: 1, justifyContent: 'center' },
  content: { padding: spacing.xxl, justifyContent: 'center', gap: spacing.md },
  title: {
    fontSize: typography.size['3xl'],
    fontWeight: 'bold',
    color: colors.text,
  },
  description: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.lg,
    fontSize: typography.size.base,
    color: colors.text,
  },
  error: { color: colors.error },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.lg,
    borderRadius: spacing.md,
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: colors.text,
    fontSize: typography.size.base,
    fontWeight: '600',
  },
});
