import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { OWNER_INVOICES } from '@/lib/mock-data';

export default function OwnerInvoicesScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Invoices" />

      <View style={styles.summaryGrid}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>$858</Text>
          <Text style={styles.summaryLabel}>Collected this week</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={[styles.summaryValue, { color: colors.accent }]}>$424</Text>
          <Text style={styles.summaryLabel}>Outstanding</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Recent invoices</Text>

      <View style={styles.table}>
        {OWNER_INVOICES.map((inv, idx) => (
          <View key={idx} style={styles.tableRow}>
            <Text style={styles.refCol}>#{inv.ref}</Text>
            <Text style={styles.customerCol}>{inv.customer}</Text>
            <Text style={styles.totalCol}>{inv.total}</Text>
            <View style={styles.statusCol}>
              <Tag label={inv.status} variant={inv.statusClass as any} style={styles.statusTag} />
            </View>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  summaryGrid: {
    flexDirection: 'row',
    gap: 2,
    backgroundColor: colors.divider,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.xl,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing.lg,
  },
  summaryValue: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 24,
    color: colors.text,
  },
  summaryLabel: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  table: {
    marginTop: spacing.sm,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  refCol: {
    width: 44,
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    color: colors.text,
    fontSize: typography.size.sm,
  },
  customerCol: {
    flex: 1,
    fontSize: typography.size.sm,
    color: colors.text,
  },
  totalCol: {
    textAlign: 'right',
    fontWeight: '600',
    color: colors.text,
    fontSize: typography.size.sm,
    marginRight: spacing.md,
  },
  statusCol: {
    width: 56,
    alignItems: 'flex-end',
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});
