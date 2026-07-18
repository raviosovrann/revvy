import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { RECOMMEND_ITEMS } from '@/lib/mock-data';

export default function TechEstimateCreateScreen() {
  const router = useRouter();
  const [items, setItems] = useState(RECOMMEND_ITEMS);

  const toggle = (idx: number) => {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, on: !it.on } : it)));
  };

  const total = items
    .filter((it) => it.on)
    .reduce((sum, it) => sum + parseFloat(it.price.replace(/[^0-9.]/g, '')), 0);

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Recommend work" />

      <Text style={styles.intro}>
        Select work to include in the estimate sent to the customer for approval.
      </Text>

      <View style={styles.list}>
        {items.map((item, idx) => (
          <TouchableOpacity key={idx} style={styles.itemRow} onPress={() => toggle(idx)} activeOpacity={0.8}>
            <View
              style={[
                styles.checkbox,
                {
                  backgroundColor: item.on ? colors.accent : 'transparent',
                  borderColor: item.on ? colors.accent : colors.textMuted,
                },
              ]}
            >
              {item.on && <CheckIcon size={12} color={colors.bg} strokeWidth={3.5} />}
            </View>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.field}>
        <Text style={styles.label}>Note to customer</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          defaultValue="Inspection found rotor scoring and worn pads. Recommend resurface + ceramic pads."
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Estimate subtotal</Text>
        <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
      </View>

      <View style={styles.footer}>
        <Button title="Send estimate for approval" onPress={() => router.back()} style={styles.sendButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 110,
  },
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
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemName: {
    flex: 1,
    fontSize: typography.size.base,
    color: colors.text,
  },
  itemPrice: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  field: {
    marginTop: spacing.lg,
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
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginTop: spacing.lg,
    paddingTop: spacing.lg,
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  totalLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.lg,
    color: colors.text,
  },
  totalValue: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 26,
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
  sendButton: {
    width: '100%',
  },
});
