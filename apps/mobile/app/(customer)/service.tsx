import { View, Text, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag, Card } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { SERVICES, decorateService } from '@/lib/mock-data';

export default function ServiceScreen() {
  const router = useRouter();
  const { serviceId, shopId } = useLocalSearchParams<{ serviceId?: string; shopId?: string }>();
  const service = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const svc = decorateService(service);

  const handleBook = () => {
    router.push({
      pathname: '/(customer)/book-vehicle',
      params: { serviceId: service.id, shopId },
    });
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title={service.name} />

      <View style={styles.headerRow}>
        <Tag label={svc.badge} variant={svc.badgeClass as any} />
        <Text style={styles.serviceMeta}>
          {service.cat} · {service.dur}
        </Text>
      </View>

      <Text style={styles.price}>{svc.priceBig}</Text>
      {svc.priceSub ? <Text style={styles.priceSub}>{svc.priceSub}</Text> : null}

      <View style={styles.divider} />

      <Text style={styles.desc}>{service.desc}</Text>

      <Card style={styles.promiseCard}>
        <Text style={styles.promiseTitle}>{svc.promiseTitle}</Text>
        <Text style={styles.promiseText}>{svc.promise}</Text>
      </Card>

      <View style={styles.footer}>
        <Button title={svc.bookCta} onPress={handleBook} style={styles.bookButton} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 120,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  serviceMeta: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  price: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['6xl'],
    color: colors.text,
    letterSpacing: -1,
    lineHeight: 42,
  },
  priceSub: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 6,
    maxWidth: 280,
  },
  divider: {
    height: 1,
    backgroundColor: colors.divider,
    marginVertical: spacing.lg,
  },
  desc: {
    fontSize: typography.size.base,
    lineHeight: 22,
    color: colors.text,
  },
  promiseCard: {
    marginTop: spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: colors.accent,
  },
  promiseTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.accent,
    fontWeight: '800',
    fontFamily: typography.heading.fontFamily,
    marginBottom: spacing.sm,
  },
  promiseText: {
    fontSize: typography.size.md,
    lineHeight: 20,
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
  bookButton: {
    width: '100%',
  },
});
