import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';

const INITIAL_ITEMS = [
  { id: 'i1', label: 'Front brake pads', status: 'fail' as const },
  { id: 'i2', label: 'Front rotors', status: 'warn' as const },
  { id: 'i3', label: 'Tire tread depth', status: 'pass' as const },
  { id: 'i4', label: 'Battery health', status: 'pass' as const },
  { id: 'i5', label: 'Fluid levels', status: 'warn' as const },
];

const STATUS_ORDER = ['pass', 'warn', 'fail'] as const;

export default function TechInspectionScreen() {
  const router = useRouter();
  const [items, setItems] = useState(INITIAL_ITEMS);

  const cycle = (id: string) => {
    setItems((prev) =>
      prev.map((it) => {
        if (it.id !== id) return it;
        const idx = STATUS_ORDER.indexOf(it.status);
        const next = STATUS_ORDER[(idx + 1) % STATUS_ORDER.length];
        return { ...it, status: next };
      })
    );
  };

  const styleFor = (status: string) => {
    switch (status) {
      case 'pass':
        return { bg: colors.surfaceLight, color: colors.textSecondary, dot: colors.textMuted, label: 'Pass' };
      case 'warn':
        return { bg: 'rgba(245, 158, 11, 0.15)', color: colors.warning, dot: colors.warning, label: 'Attention' };
      case 'fail':
        return { bg: 'rgba(239, 68, 68, 0.15)', color: colors.error, dot: colors.error, label: 'Fail' };
      default:
        return { bg: colors.surfaceLight, color: colors.text, dot: colors.text, label: status };
    }
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Inspection" />

      <Text style={styles.intro}>Tap a status to cycle Pass → Attention → Fail.</Text>

      <View style={styles.list}>
        {items.map((it) => {
          const style = styleFor(it.status);
          return (
            <View key={it.id} style={styles.itemRow}>
              <View style={[styles.dot, { backgroundColor: style.dot }]} />
              <Text style={styles.itemLabel}>{it.label}</Text>
              <TouchableOpacity
                style={[styles.statusBadge, { backgroundColor: style.bg }]}
                onPress={() => cycle(it.id)}
                activeOpacity={0.8}
              >
                <Text style={[styles.statusText, { color: style.color }]}>{style.label}</Text>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Inspection notes</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          defaultValue="Front pads at 2mm, rotors scored below minimum thickness."
          multiline
          numberOfLines={4}
        />
      </View>

      <Button title="Save inspection" onPress={() => router.back()} style={styles.saveButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  intro: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  list: {
    flexDirection: 'column',
    gap: spacing.sm,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    backgroundColor: colors.surface,
  },
  dot: {
    width: 10,
    height: 10,
  },
  itemLabel: {
    flex: 1,
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
  },
  statusText: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.xs,
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  field: {
    marginTop: spacing.xl,
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
  textarea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    width: '100%',
    marginTop: spacing.lg,
  },
});
