import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { SHOPS, SERVICES, VEHICLES, decorateService } from '@/lib/mock-data';

export default function BookReviewScreen() {
  const router = useRouter();
  const { serviceId, shopId, vehicleId, slot } = useLocalSearchParams<{
    serviceId?: string;
    shopId?: string;
    vehicleId?: string;
    slot?: string;
  }>();

  const shop = SHOPS.find((s) => s.id === shopId) || SHOPS[0];
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const svc = decorateService(service);
  const vehicle = VEHICLES.find((v) => v.id === vehicleId);

  const handleConfirm = () => {
    router.push({ pathname: '/(customer)/book-done' });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Review" />

      <View style={styles.progress}>
        <View style={[styles.progressBar, styles.progressActive]} />
        <View style={[styles.progressBar, styles.progressActive]} />
        <View style={[styles.progressBar, styles.progressActive]} />
      </View>

      <View style={styles.summary}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Shop</Text>
          <Text style={styles.rowValue}>{shop.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Service</Text>
          <Text style={styles.rowValue}>{service.name}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Vehicle</Text>
          <Text style={styles.rowValue}>
            {vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : '—'}
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>When</Text>
          <Text style={styles.rowValue}>{slot || '—'}</Text>
        </View>
      </View>

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>{svc.dueLabel}</Text>
        <Text style={styles.totalValue}>{svc.priceBig}</Text>
      </View>
      {svc.priceSub ? <Text style={styles.priceSub}>{svc.priceSub}</Text> : null}

      <View style={styles.footer}>
        <Button title="Confirm booking" onPress={handleConfirm} style={styles.confirmButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 120,
  },
  progress: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: spacing.xl,
  },
  progressBar: {
    flex: 1,
    height: 3,
    backgroundColor: colors.surfaceLight,
  },
  progressActive: {
    backgroundColor: colors.accent,
  },
  summary: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  rowLabel: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  rowValue: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
    textAlign: 'right',
    maxWidth: '60%',
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
  priceSub: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  confirmButton: {
    width: '100%',
  },
});
