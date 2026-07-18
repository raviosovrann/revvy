import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag, Divider } from '@/components/ui';
import { PhoneIcon, MapPinIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { SHOPS, SERVICES, decorateService } from '@/lib/mock-data';

export default function ShopScreen() {
  const router = useRouter();
  const { shopId } = useLocalSearchParams<{ shopId?: string }>();
  const shop = SHOPS.find((s) => s.id === shopId) || SHOPS[0];

  return (
    <ScreenWrapper>
      <ScreenHeader title={shop.name} />

      <View style={styles.shopMeta}>
        <Text style={styles.shopAddr}>
          {shop.addr} · {shop.area}
        </Text>
        <Text style={[styles.shopHours, { color: shop.open ? colors.accent : colors.textMuted }]}>
          {shop.hours}
        </Text>
        <View style={styles.actionButtons}>
          <Button title="Call" variant="secondary" style={styles.actionButton} />
          <Button title="Directions" variant="secondary" style={styles.actionButton} />
        </View>
      </View>

      <Divider style={styles.divider} />

      <Text style={styles.sectionTitle}>Services</Text>

      <View style={styles.serviceList}>
        {SERVICES.map((service) => {
          const svc = decorateService(service);
          return (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceRow}
              onPress={() =>
                router.push({
                  pathname: '/(customer)/service',
                  params: { serviceId: service.id, shopId: shop.id },
                })
              }
              activeOpacity={0.8}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceCat}>
                  {service.cat} · {service.dur}
                </Text>
                <Tag label={svc.badge} variant={svc.badgeClass as any} style={styles.serviceBadge} />
              </View>
              <View style={styles.servicePriceCol}>
                <Text style={styles.servicePrice}>{svc.priceBig}</Text>
                <Text style={styles.bookLink}>Book →</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  shopMeta: {
    paddingHorizontal: spacing.lg,
  },
  shopAddr: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
  },
  shopHours: {
    fontSize: typography.size.md,
    marginTop: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  actionButton: {
    flex: 1,
  },
  divider: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  serviceList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
    marginHorizontal: spacing.lg,
  },
  serviceRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    alignItems: 'flex-start',
  },
  serviceInfo: {
    flex: 1,
    minWidth: 0,
  },
  serviceName: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.xl,
    color: colors.text,
  },
  serviceCat: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  serviceBadge: {
    marginTop: spacing.sm,
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  servicePriceCol: {
    alignItems: 'flex-end',
    flex: 'none' as any,
  },
  servicePrice: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.text,
  },
  bookLink: {
    color: colors.accent,
    fontSize: typography.size.sm,
    fontWeight: '800',
    fontFamily: typography.heading.fontFamily,
    marginTop: 6,
  },
});
