import { View, Text, TextInput, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { colors, spacing, typography } from '@/constants/theme';

const HOURS = [
  { label: 'Mon – Fri', value: '8:00 AM – 6:00 PM' },
  { label: 'Saturday', value: '9:00 AM – 3:00 PM' },
  { label: 'Sunday', value: 'Closed' },
];

export default function OwnerSettingsScreen() {
  const [autoConfirm, setAutoConfirm] = useState(true);
  const [requireDeposit, setRequireDeposit] = useState(false);

  return (
    <ScreenWrapper>
      <ScreenHeader title="Shop settings" />

      <View style={styles.field}>
        <Text style={styles.label}>Shop name</Text>
        <TextInput style={styles.input} defaultValue="Grand Street Auto" />
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Address</Text>
        <TextInput style={styles.input} defaultValue="118 Grand St, New York, NY 10013" />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Phone</Text>
          <TextInput style={styles.input} defaultValue="(212) 555·0100" />
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Timezone</Text>
          <TextInput style={styles.input} defaultValue="America/New_York" />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Business hours</Text>
      <View style={styles.hoursList}>
        {HOURS.map((h, idx) => (
          <View key={idx} style={styles.hourRow}>
            <Text style={styles.hourLabel}>{h.label}</Text>
            <Text style={[styles.hourValue, h.value === 'Closed' && { color: colors.textMuted }]}>
              {h.value}
            </Text>
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Booking</Text>

      <View style={styles.checkboxRow}>
        <View style={[styles.checkbox, autoConfirm && styles.checkboxActive]}>
          {autoConfirm && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxLabel}>Auto-confirm new appointments</Text>
      </View>

      <View style={styles.checkboxRow}>
        <View style={[styles.checkbox, requireDeposit && styles.checkboxActive]}>
          {requireDeposit && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxLabel}>Require deposit to book</Text>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.md,
  },
  label: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.size.base,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  hoursList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  hourRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 11,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  hourLabel: {
    fontSize: typography.size.base,
    color: colors.text,
  },
  hourValue: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 1,
    backgroundColor: colors.text,
  },
  checkboxLabel: {
    fontSize: typography.size.base,
    color: colors.text,
  },
});
