import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { colors, spacing, typography } from '@/constants/theme';
import { Button } from '@/components/ui';

type Role = 'customer' | 'owner' | 'tech';

export default function LandingScreen() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<Role>('customer');

  const handleContinue = () => {
    if (selectedRole === 'customer') router.replace('/(customer)');
    else if (selectedRole === 'owner') router.replace('/(owner)');
    else router.replace('/(tech)');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Revvy</Text>
        <Text style={styles.subtitle}>Auto-service management for independent shops</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Select a role to explore</Text>

        {([
          { key: 'customer', label: 'Customer', desc: 'Book service, approve estimates, pay invoices' },
          { key: 'owner', label: 'Owner / Manager', desc: 'Run the shop, team, services, and bookings' },
          { key: 'tech', label: 'Technician', desc: 'Execute jobs, inspections, and notes' },
        ] as { key: Role; label: string; desc: string }[]).map((role) => (
          <TouchableOpacity
            key={role.key}
            style={[styles.roleOption, selectedRole === role.key && styles.roleOptionActive]}
            onPress={() => setSelectedRole(role.key)}
            activeOpacity={0.8}
          >
            <View style={styles.radio}>
              {selectedRole === role.key && <View style={styles.radioInner} />}
            </View>
            <View style={styles.roleText}>
              <Text style={styles.roleLabel}>{role.label}</Text>
              <Text style={styles.roleDesc}>{role.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Continue" onPress={handleContinue} style={styles.continueButton} />

      {/* Sign-in flow is disabled while we focus on UI/UX exploration. */}
      {/* <TouchableOpacity onPress={() => router.push('/(auth)/sign-in')} style={styles.signInLink}>
        <Text style={styles.signInText}>Sign in with phone number</Text>
      </TouchableOpacity> */}
    </ScrollView>
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
    padding: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  title: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['6xl'],
    color: colors.text,
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: spacing.lg,
    padding: spacing.lg,
    marginBottom: spacing.xl,
  },
  cardTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.text,
    marginBottom: spacing.lg,
  },
  roleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.surface,
  },
  roleOptionActive: {
    borderColor: colors.secondary,
    backgroundColor: 'rgba(139, 92, 246, 0.15)',
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
    backgroundColor: colors.secondary,
  },
  roleText: {
    flex: 1,
  },
  roleLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.lg,
    color: colors.text,
  },
  roleDesc: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  continueButton: {
    width: '100%',
  },
  signInLink: {
    marginTop: spacing.lg,
    alignItems: 'center',
  },
  signInText: {
    fontSize: typography.size.base,
    color: colors.accent,
  },
});
