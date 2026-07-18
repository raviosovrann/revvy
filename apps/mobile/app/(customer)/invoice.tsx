import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag } from '@/components/ui';
import { ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { INVOICE } from '@/lib/mock-data';

export default function InvoiceScreen() {
  const router = useRouter();
  const [paid, setPaid] = useState(false);

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Invoice" />

      <View style={styles.headerRow}>
        <View>
          <Text style={styles.refLabel}>Invoice #{INVOICE.ref}</Text>
          <Text style={styles.shopName}>{INVOICE.shop}</Text>
        </View>
        <Tag label={paid ? 'PAID' : 'OPEN'} variant={paid ? 'accent' : 'outline'} />
      </View>

      <View style={styles.lineItems}>
        {INVOICE.items.map((item, idx) => (
          <View key={idx} style={styles.lineItem}>
            <Text style={styles.lineItemName}>{item.name}</Text>
            <Text style={styles.lineItemPrice}>{item.price}</Text>
          </View>
        ))}
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>{INVOICE.subtotal}</Text>
        </View>
        <View style={styles.taxRow}>
          <Text style={styles.subtotalLabel}>Tax</Text>
          <Text style={styles.subtotalValue}>{INVOICE.tax}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{INVOICE.dueLabel}</Text>
          <Text style={styles.totalValue}>{INVOICE.total}</Text>
        </View>
      </View>

      {!paid && (
        <View style={styles.footer}>
          <Button title={`Pay ${INVOICE.total}`} onPress={() => router.push('/(customer)/pay')} style={styles.payButton} />
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 130,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  refLabel: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  shopName: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 2,
  },
  lineItems: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  lineItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.lg,
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  lineItemName: {
    fontSize: typography.size.base,
    color: colors.text,
  },
  lineItemPrice: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  subtotalLabel: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
  subtotalValue: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: colors.divider,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: spacing.lg,
  },
  totalLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.xl,
    color: colors.text,
  },
  totalValue: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 28,
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
  payButton: {
    width: '100%',
  },
});
