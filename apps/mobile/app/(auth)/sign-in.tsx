import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/constants/theme';

type Role = 'customer' | 'owner' | 'tech';

const ROLES: { key: Role; label: string; desc: string }[] = [
  { key: 'customer', label: 'Customer', desc: 'Book service, approve estimates, pay invoices' },
  { key: 'owner', label: 'Owner / Manager', desc: 'Run the shop, team, services, and bookings' },
  { key: 'tech', label: 'Technician', desc: 'Execute jobs, inspections, and notes' },
];

export default function SignInScreen() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<Role>('customer');

  const handleContinue = () => {
    // V1 scaffold: skip real phone verification for product exploration
    if (role === 'customer') router.replace('/(customer)');
    else if (role === 'owner') router.replace('/(owner)');
    else router.replace('/(tech)');
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
            Choose your role and enter your phone number.
          </Text>

          <Text style={styles.sectionLabel}>I am a</Text>
          <View style={styles.roleList}>
            {ROLES.map((r) => (
              <TouchableOpacity
                key={r.key}
                style={[styles.roleOption, role === r.key && styles.roleOptionActive]}
                onPress={() => setRole(r.key)}
                activeOpacity={0.8}
              >
                <View style={styles.radio}>
                  {role === r.key && <View style={styles.radioInner} />}
                </View>
                <View style={styles.roleText}>
                  <Text style={styles.roleLabel}>{r.label}</Text>
                  <Text style={styles.roleDesc}>{r.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Phone number</Text>
          <TextInput
            style={styles.input}
            placeholder="+1 (555) 000-0000"
            placeholderTextColor={colors.textMuted}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            autoComplete="tel"
            autoFocus
            returnKeyType="done"
            onSubmitEditing={handleContinue}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleContinue}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: spacing.xxl,
    justifyContent: 'center',
  },
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
  roleList: {
    flexDirection: 'column',
    gap: spacing.md,
  },
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
  roleText: {
    flex: 1,
  },
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
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: spacing.lg,
    borderRadius: spacing.md,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.accentDark,
  },
  buttonText: {
    color: colors.text,
    fontSize: typography.size.base,
    fontWeight: '700',
  },
});
