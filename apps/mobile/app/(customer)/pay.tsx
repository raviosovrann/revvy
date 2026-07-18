import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Card } from '@/components/ui';
import { CreditCardIcon, LockIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { INVOICE } from '@/lib/mock-data';

export default function PayScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Payment" />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{INVOICE.shop}</Text>
        <Text style={styles.totalValue}>{INVOICE.total}</Text>
      </View>

      <Text style={styles.sectionTitle}>Payment method</Text>

      <View style={styles.paymentMethod}>
        <View style={styles.visaBox}>
          <Text style={styles.visaText}>VISA</Text>
        </View>
        <View style={styles.paymentInfo}>
          <Text style={styles.paymentCard}>Visa ···· 4242</Text>
          <Text style={styles.paymentExpiry}>Expires 08/28</Text>
        </View>
        <View style={styles.radioSelected} />
      </View>

      <Button title="+ Add card / Apple Pay" variant="secondary" style={styles.addButton} />

      <View style={styles.securityRow}>
        <LockIcon size={14} color={colors.textMuted} />
        <Text style={styles.securityText}>Payments secured by Stripe. Revvy never stores your card.</Text>
      </View>

      <View style={styles.footer}>
        <Button title={`Pay ${INVOICE.total}`} onPress={() => router.push('/(customer)/receipt')} style={styles.payButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 130,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    paddingVertical: 4,
    paddingBottom: spacing.lg,
    borderBottomWidth: 2,
    borderBottomColor: colors.divider,
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
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: colors.accent,
  },
  visaBox: {
    width: 38,
    height: 26,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  visaText: {
    fontSize: 9,
    fontWeight: '800',
    fontFamily: typography.heading.fontFamily,
    color: colors.bg,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentCard: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  paymentExpiry: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  radioSelected: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    borderWidth: 3,
    borderColor: colors.bg,
    shadowColor: colors.text,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  addButton: {
    width: '100%',
    marginTop: spacing.md,
  },
  securityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  securityText: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    flex: 1,
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
