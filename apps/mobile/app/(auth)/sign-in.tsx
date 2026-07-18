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
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/constants/theme';
import { supabase } from '@/lib/supabase';

type Role = 'customer' | 'owner' | 'tech';

const ROLES: { key: Role; label: string; desc: string }[] = [
  {
    key: 'customer',
    label: 'Customer',
    desc: 'Book service, approve estimates, and view history',
  },
  {
    key: 'owner',
    label: 'Owner / Manager',
    desc: 'Create or operate your shop',
  },
  { key: 'tech', label: 'Technician', desc: 'Open work assigned by your shop' },
];

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Role>('customer');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleContinue = async () => {
    const normalizedPhone = phone.replace(/[\s()-]/g, '');
    if (!/^\+[1-9]\d{7,14}$/.test(normalizedPhone)) {
      setErrorMessage(
        'Enter a phone number with country code, for example +12125550123.',
      );
      return;
    }

    setSubmitting(true);
    setErrorMessage(null);
    const { error } = await supabase.auth.signInWithOtp({
      phone: normalizedPhone,
    });
    setSubmitting(false);
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push({
      pathname: '/(auth)/verify-otp',
      params: { phone: normalizedPhone, role },
    });
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
          <Text style={styles.title}>Sign In</Text>
          <Text style={styles.description}>
            Choose your workspace and verify your phone number.
          </Text>

          <Text style={styles.sectionLabel}>I am a</Text>
          <View style={styles.roleList}>
            {ROLES.map((item) => (
              <TouchableOpacity
                key={item.key}
                style={[
                  styles.roleOption,
                  role === item.key && styles.roleOptionActive,
                ]}
                onPress={() => setRole(item.key)}
                activeOpacity={0.8}
              >
                <View style={styles.radio}>
                  {role === item.key && <View style={styles.radioInner} />}
                </View>
                <View style={styles.roleText}>
                  <Text style={styles.roleLabel}>{item.label}</Text>
                  <Text style={styles.roleDesc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 (212) 555-0123"
            placeholderTextColor={colors.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
            returnKeyType="done"
            onSubmitEditing={() => void handleContinue()}
          />
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
          <TouchableOpacity
            style={[styles.button, submitting && styles.buttonDisabled]}
            onPress={() => void handleContinue()}
            disabled={submitting}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {submitting ? 'Sending…' : 'Continue'}
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
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['4xl'],
    color: colors.text,
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  sectionLabel: {
    fontSize: typography.size.sm,
    fontWeight: '700',
    color: colors.textSecondary,
    marginBottom: spacing.md,
    marginTop: spacing.lg,
  },
  roleList: { flexDirection: 'column', gap: spacing.md },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.surface,
  },
  roleOptionActive: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceLight,
  },
  radio: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.textSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.accent,
  },
  roleText: { flex: 1 },
  roleLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  roleDesc: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.lg,
    fontSize: typography.size.lg,
    color: colors.text,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  error: { color: colors.error, marginTop: spacing.sm },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.lg,
    borderRadius: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: colors.text,
    fontSize: typography.size.base,
    fontWeight: '700',
  },
});
