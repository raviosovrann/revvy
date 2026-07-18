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
import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/constants/theme';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/lib/auth-store';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone, role = 'customer' } = useLocalSearchParams<{
    phone: string;
    role?: string;
  }>();
  const refreshShops = useAuthStore((state) => state.refreshShops);
  const [code, setCode] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!phone || !/^\d{6}$/.test(code)) {
      setErrorMessage('Enter the 6-digit code from your message.');
      return;
    }
    setSubmitting(true);
    setErrorMessage(null);
    const { data, error } = await supabase.auth.verifyOtp({
      phone,
      token: code,
      type: 'sms',
    });
    if (error || !data.session) {
      setSubmitting(false);
      setErrorMessage(error?.message || 'The code could not be verified.');
      return;
    }

    // Update immediately; the auth listener then keeps refreshes and revocation in sync.
    let shops;
    try {
      shops = await refreshShops();
    } catch {
      setSubmitting(false);
      setErrorMessage(
        'Signed in, but your shop access could not be loaded. Try again.',
      );
      return;
    }
    setSubmitting(false);
    if (role === 'owner' && shops.length === 0)
      router.replace('/(auth)/create-shop');
    else if (role === 'tech') router.replace('/(tech)');
    else if (role === 'owner') router.replace('/(owner)');
    else router.replace('/(customer)');
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
          <Text style={styles.title}>Verify Code</Text>
          <Text style={styles.description}>
            Enter the 6-digit code sent to {phone}
          </Text>
          <TextInput
            style={styles.input}
            placeholder="000000"
            placeholderTextColor={colors.textMuted}
            value={code}
            onChangeText={setCode}
            keyboardType="number-pad"
            maxLength={6}
            textAlign="center"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={() => void handleVerify()}
          />
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <TouchableOpacity
            style={[styles.button, submitting && styles.buttonDisabled]}
            onPress={() => void handleVerify()}
            disabled={submitting}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {submitting ? 'Verifying…' : 'Verify'}
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
  content: { padding: spacing.xxl, justifyContent: 'center' },
  title: {
    fontSize: typography.size['3xl'],
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.xxl,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.lg,
    fontSize: typography.size['2xl'],
    color: colors.text,
    marginBottom: spacing.md,
    letterSpacing: 8,
  },
  error: { color: colors.error, marginBottom: spacing.md },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.lg,
    borderRadius: spacing.md,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: colors.text,
    fontSize: typography.size.base,
    fontWeight: '600',
  },
});
