import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Button } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { INVOICE } from '@/lib/mock-data';

export default function ReceiptScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper scroll={false} style={styles.center}>
      <View style={styles.iconCircle}>
        <CheckIcon size={40} color={colors.bg} strokeWidth={3} />
      </View>
      <Text style={styles.title}>Payment complete</Text>
      <Text style={styles.subtitle}>
        {INVOICE.total} paid to {INVOICE.shop}
      </Text>

      <View style={styles.receiptBox}>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Receipt</Text>
          <Text style={styles.receiptValue}>#{INVOICE.ref}</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Paid with</Text>
          <Text style={styles.receiptValue}>Visa ···· 4242</Text>
        </View>
        <View style={styles.receiptRow}>
          <Text style={styles.receiptLabel}>Date</Text>
          <Text style={styles.receiptValue}>Jul 18, 2026</Text>
        </View>
      </View>

      <Button title="Email receipt" variant="secondary" style={styles.button} />
      <Button title="Done" variant="ghost" onPress={() => router.replace('/(customer)/appointments')} style={styles.ghostButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
  },
  iconCircle: {
    width: 76,
    height: 76,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['5xl'],
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  receiptBox: {
    width: '100%',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  receiptLabel: {
    fontSize: typography.size.md,
    color: colors.textMuted,
  },
  receiptValue: {
    fontSize: typography.size.md,
    fontWeight: '600',
    color: colors.text,
  },
  button: {
    width: '100%',
    marginTop: spacing.xl,
  },
  ghostButton: {
    marginTop: spacing.sm,
  },
});
