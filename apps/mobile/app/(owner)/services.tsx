import { useCallback, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useFocusEffect, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, EmptyState, Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/lib/auth-store';

type Service = {
  id: string;
  name: string;
  category?: string | null;
  durationMinutes: number;
  priceType: 'FIXED_PRICE' | 'STARTING_AT' | 'INSPECTION_REQUIRED';
  priceMinor?: number | null;
  startingPriceMinor?: number | null;
  inspectionFeeMinor?: number | null;
  currency: string;
  active: boolean;
  bookingAvailable: boolean;
};

function servicePrice(service: Service) {
  const minor =
    service.priceMinor ??
    service.startingPriceMinor ??
    service.inspectionFeeMinor ??
    0;
  const formatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: service.currency,
  }).format(minor / 100);
  if (service.priceType === 'STARTING_AT') return `From ${formatted}`;
  if (service.priceType === 'INSPECTION_REQUIRED')
    return `${formatted} inspection`;
  return formatted;
}

export default function OwnerServicesScreen() {
  const router = useRouter();
  const shopId = useAuthStore((state) => state.activeShop?.shopId);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadServices = useCallback(async () => {
    if (!shopId) {
      setErrorMessage('Choose an active shop to manage services.');
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const response = await apiClient.get<{ services: Service[] }>(
        `/shops/${shopId}/services`,
      );
      setServices(response.services);
      setErrorMessage(null);
    } catch {
      setErrorMessage('Services could not be loaded. Pull back and try again.');
    } finally {
      setLoading(false);
    }
  }, [shopId]);

  useFocusEffect(
    useCallback(() => {
      void loadServices();
    }, [loadServices]),
  );

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Services" showBack={false} />
      <Text style={styles.sectionTitle}>
        {services.filter((service) => service.active).length} active services
      </Text>

      {loading ? (
        <Text style={styles.status}>Loading services…</Text>
      ) : errorMessage ? (
        <View style={styles.statusBlock}>
          <Text style={styles.error}>{errorMessage}</Text>
          <Button
            title="Retry"
            variant="secondary"
            onPress={() => void loadServices()}
          />
        </View>
      ) : services.length === 0 ? (
        <EmptyState
          title="No services yet"
          subtitle="Create and publish the first bookable service."
        />
      ) : (
        <View style={styles.serviceList}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceRow}
              onPress={() =>
                router.push({
                  pathname: '/more/service-edit',
                  params: { serviceId: service.id },
                })
              }
              activeOpacity={0.8}
            >
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{service.name}</Text>
                <Text style={styles.serviceCat}>
                  {service.category || 'Uncategorized'} ·{' '}
                  {service.durationMinutes} min
                </Text>
                <Tag
                  label={
                    service.active && service.bookingAvailable
                      ? 'Published'
                      : 'Draft'
                  }
                  variant={
                    service.active && service.bookingAvailable
                      ? 'accent'
                      : 'outline'
                  }
                  style={styles.serviceBadge}
                />
              </View>
              <Text style={styles.servicePrice}>{servicePrice(service)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <View style={styles.footer}>
        <Button
          title="+ New service"
          onPress={() => router.push('/more/service-edit')}
          style={styles.newButton}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingBottom: 110 },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  status: { color: colors.textSecondary },
  statusBlock: { gap: spacing.md },
  error: { color: colors.error },
  serviceList: { borderTopWidth: 2, borderTopColor: colors.divider },
  serviceRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    alignItems: 'flex-start',
  },
  serviceInfo: { flex: 1, minWidth: 0 },
  serviceName: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  serviceCat: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  serviceBadge: {
    marginTop: spacing.xs,
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  servicePrice: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
    maxWidth: 120,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  newButton: { width: '100%' },
});
