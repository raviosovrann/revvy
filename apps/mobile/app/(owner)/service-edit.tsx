import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { SERVICES, decorateService } from '@/lib/mock-data';

const PRICE_TYPES = [
  { t: 'FIXED', label: 'Fixed price', desc: 'Customer sees the exact price before booking.' },
  { t: 'STARTING', label: 'Starting at', desc: 'Customer sees a minimum price plus an explanation.' },
  { t: 'INSPECTION', label: 'Inspection required', desc: 'Customer pays an inspection fee; repairs need approval.' },
] as const;

export default function OwnerServiceEditScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams<{ serviceId?: string }>();
  const existing = SERVICES.find((s) => s.id === serviceId);
  const [priceType, setPriceType] = useState<'FIXED' | 'STARTING' | 'INSPECTION'>(
    (existing?.type as any) || 'FIXED'
  );

  const priceLabel = priceType === 'INSPECTION' ? 'Inspection fee' : priceType === 'STARTING' ? 'Starting price' : 'Price';

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title={existing ? 'Edit service' : 'New service'} />

      <View style={styles.field}>
        <Text style={styles.label}>Service name</Text>
        <TextInput style={styles.input} defaultValue={existing?.name || 'Brake Pad Replacement'} />
      </View>

      <View style={styles.row}>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Category</Text>
          <TextInput style={styles.input} defaultValue={existing?.cat || 'Brakes'} />
        </View>
        <View style={[styles.field, { flex: 1 }]}>
          <Text style={styles.label}>Duration</Text>
          <TextInput style={styles.input} defaultValue={existing?.dur || '2 hr'} />
        </View>
      </View>

      <Text style={styles.sectionTitle}>Pricing type</Text>

      <View style={styles.priceTypes}>
        {PRICE_TYPES.map((pt) => {
          const active = priceType === pt.t;
          return (
            <TouchableOpacity
              key={pt.t}
              style={[
                styles.priceType,
                {
                  borderColor: active ? colors.accent : colors.divider,
                  backgroundColor: active ? colors.accent : 'transparent',
                },
              ]}
              onPress={() => setPriceType(pt.t as any)}
              activeOpacity={0.8}
            >
              <View style={styles.radioRow}>
                <View style={[styles.radio, active && styles.radioActive]}>
                  {active && <View style={styles.radioInner} />}
                </View>
                <Text style={[styles.priceTypeLabel, { color: active ? colors.text : colors.text }]}>
                  {pt.label}
                </Text>
              </View>
              <Text style={[styles.priceTypeDesc, { color: active ? colors.text : colors.textSecondary }]}>
                {pt.desc}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>{priceLabel}</Text>
        <TextInput style={styles.input} defaultValue={existing ? decorateService(existing).priceBig : '$249.00'} />
      </View>

      <View style={styles.checkboxRow}>
        <View style={styles.checkbox}>
          <View style={styles.checkboxInner} />
        </View>
        <Text style={styles.checkboxLabel}>Active & bookable</Text>
      </View>

      <View style={styles.footer}>
        <Button title="Save service" onPress={() => router.back()} style={styles.saveButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 110,
  },
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
  priceTypes: {
    flexDirection: 'column',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  priceType: {
    padding: spacing.md,
    borderWidth: 1.5,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  radio: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: {
    borderColor: colors.text,
  },
  radioInner: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.text,
  },
  priceTypeLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
  },
  priceTypeDesc: {
    fontSize: typography.size.sm,
    marginTop: 5,
    paddingLeft: 22,
    opacity: 0.85,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
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
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  saveButton: {
    width: '100%',
  },
});
