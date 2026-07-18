import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { SERVICES, decorateService } from '@/lib/mock-data';

export default function OwnerServicesScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Services" showBack={false} />

      <Text style={styles.sectionTitle}>6 active services</Text>

      <View style={styles.serviceList}>
        {SERVICES.map((service) => {
          const svc = decorateService(service);
          return (
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
                  {service.cat} · {service.dur}
                </Text>
                <Tag label={svc.badge} variant={svc.badgeClass as any} style={styles.serviceBadge} />
              </View>
              <Text style={styles.servicePrice}>{svc.priceBig}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

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
  wrapper: {
    paddingBottom: 110,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  serviceList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  serviceRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    alignItems: 'flex-start',
  },
  serviceInfo: {
    flex: 1,
    minWidth: 0,
  },
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
    fontSize: typography.size.xl,
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
  newButton: {
    width: '100%',
  },
});
