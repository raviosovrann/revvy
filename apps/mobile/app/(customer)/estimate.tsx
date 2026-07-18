import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag, Card } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { ESTIMATE } from '@/lib/mock-data';

export default function EstimateScreen() {
  const router = useRouter();
  const [decision, setDecision] = useState<'approved' | 'rejected' | null>(null);

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Estimate" />

      <View style={styles.headerRow}>
        <Tag label="Approval required" variant="outline" />
        <Text style={styles.shopName}>{ESTIMATE.shop}</Text>
      </View>

      <Card style={styles.noteCard}>
        <Text style={styles.noteTitle}>Why this estimate</Text>
        <Text style={styles.noteText}>{ESTIMATE.note}</Text>
      </Card>

      <View style={styles.lineItems}>
        {ESTIMATE.items.map((item, idx) => (
          <View key={idx} style={styles.lineItem}>
            <Text style={styles.lineItemName}>{item.name}</Text>
            <Text style={styles.lineItemPrice}>{item.price}</Text>
          </View>
        ))}
        <View style={styles.subtotalRow}>
          <Text style={styles.subtotalLabel}>Subtotal</Text>
          <Text style={styles.subtotalValue}>{ESTIMATE.subtotal}</Text>
        </View>
        <View style={styles.taxRow}>
          <Text style={styles.subtotalLabel}>Tax</Text>
          <Text style={styles.subtotalValue}>{ESTIMATE.tax}</Text>
        </View>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Estimated total</Text>
          <Text style={styles.totalValue}>{ESTIMATE.total}</Text>
        </View>
      </View>

      {decision && (
        <View
          style={[
            styles.decisionBox,
            {
              backgroundColor: decision === 'approved' ? 'rgba(79, 70, 229, 0.12)' : colors.surface,
              borderLeftColor: decision === 'approved' ? colors.accent : colors.textMuted,
            },
          ]}
        >
          <Text style={[styles.decisionTitle, { color: decision === 'approved' ? colors.accent : colors.textMuted }]}>
            {decision === 'approved' ? 'Approved' : 'Declined'}
          </Text>
          <Text style={styles.decisionSub}>
            {decision === 'approved'
              ? 'The shop has been notified and work will continue.'
              : 'No additional work will be performed without your approval.'}
          </Text>
        </View>
      )}

      {!decision && (
        <View style={styles.footer}>
          <Button title="Decline" variant="secondary" onPress={() => setDecision('rejected')} style={styles.declineButton} />
          <Button
            title={`Approve ${ESTIMATE.total}`}
            onPress={() => setDecision('approved')}
            style={styles.approveButton}
          />
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
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  shopName: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  noteCard: {
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
    marginBottom: spacing.xl,
  },
  noteTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '800',
    fontFamily: typography.heading.fontFamily,
    marginBottom: spacing.sm,
  },
  noteText: {
    fontSize: typography.size.md,
    lineHeight: 20,
    color: colors.textSecondary,
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
  decisionBox: {
    padding: spacing.lg,
    borderLeftWidth: 3,
    marginTop: spacing.sm,
  },
  decisionTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.lg,
  },
  decisionSub: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginTop: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
    flexDirection: 'row',
    gap: spacing.md,
  },
  declineButton: {
    flex: 1,
  },
  approveButton: {
    flex: 2,
  },
});
