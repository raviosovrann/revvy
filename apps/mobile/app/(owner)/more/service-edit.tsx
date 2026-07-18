import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { CreateServiceRequest } from '@revvy/contracts';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { apiClient } from '@/lib/api-client';
import { useAuthStore } from '@/lib/auth-store';

type PriceType = CreateServiceRequest['priceType'];
type Service = CreateServiceRequest & { id: string };

const PRICE_TYPES: { value: PriceType; label: string; desc: string }[] = [
  {
    value: 'FIXED_PRICE',
    label: 'Fixed price',
    desc: 'Customer sees the exact price before booking.',
  },
  {
    value: 'STARTING_AT',
    label: 'Starting at',
    desc: 'Customer sees a minimum price plus an explanation.',
  },
  {
    value: 'INSPECTION_REQUIRED',
    label: 'Inspection required',
    desc: 'Repairs require a separate estimate and approval.',
  },
];

function dollarsToMinor(value: string) {
  const normalized = value.replace(/[$,\s]/g, '');
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized) * 100);
}

export default function OwnerServiceEditScreen() {
  const router = useRouter();
  const { serviceId } = useLocalSearchParams<{ serviceId?: string }>();
  const shopId = useAuthStore((state) => state.activeShop?.shopId);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('60');
  const [priceType, setPriceType] = useState<PriceType>('FIXED_PRICE');
  const [price, setPrice] = useState('');
  const [published, setPublished] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!serviceId || !shopId) return;
    void apiClient
      .get<Service>(`/shops/${shopId}/services/${serviceId}`)
      .then((service) => {
        setName(service.name);
        setCategory(service.category || '');
        setDurationMinutes(String(service.durationMinutes));
        setPriceType(service.priceType);
        const minor =
          service.priceMinor ??
          service.startingPriceMinor ??
          service.inspectionFeeMinor ??
          0;
        setPrice((minor / 100).toFixed(2));
        setPublished(Boolean(service.active && service.bookingAvailable));
      })
      .catch(() => setErrorMessage('This service could not be loaded.'));
  }, [serviceId, shopId]);

  const save = async () => {
    const priceMinor = dollarsToMinor(price);
    const duration = Number(durationMinutes);
    if (
      !shopId ||
      !name.trim() ||
      !Number.isInteger(duration) ||
      duration < 1 ||
      priceMinor === null
    ) {
      setErrorMessage(
        'Enter a name, whole-minute duration, and valid dollar amount.',
      );
      return;
    }

    const pricing =
      priceType === 'FIXED_PRICE'
        ? { priceMinor }
        : priceType === 'STARTING_AT'
          ? { startingPriceMinor: priceMinor }
          : { inspectionFeeMinor: priceMinor };
    const request: CreateServiceRequest = {
      name: name.trim(),
      ...(category.trim() ? { category: category.trim() } : {}),
      priceType,
      ...pricing,
      durationMinutes: duration,
      currency: 'USD',
      taxBehavior: 'EXCLUSIVE',
      active: serviceId ? false : published,
      bookingAvailable: serviceId ? false : published,
    };

    setSubmitting(true);
    setErrorMessage(null);
    try {
      const service = serviceId
        ? await apiClient.patch<Service>(
            `/shops/${shopId}/services/${serviceId}`,
            request,
          )
        : await apiClient.post<Service>(`/shops/${shopId}/services`, request);
      if (serviceId && published)
        await apiClient.post(`/shops/${shopId}/services/${service.id}/publish`);
      else if (serviceId)
        await apiClient.post(`/shops/${shopId}/services/${service.id}/archive`);
      router.back();
    } catch (error) {
      const message =
        typeof error === 'object' && error && 'error' in error
          ? String(
              (error as { error?: { message?: string } }).error?.message ||
                'Service could not be saved.',
            )
          : 'Service could not be saved.';
      setErrorMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  const priceLabel =
    priceType === 'INSPECTION_REQUIRED'
      ? 'Inspection fee'
      : priceType === 'STARTING_AT'
        ? 'Starting price'
        : 'Price';

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title={serviceId ? 'Edit service' : 'New service'} />
      <View style={styles.field}>
        <Text style={styles.label}>Service name</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Brake inspection"
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <View style={styles.row}>
        <View style={[styles.field, styles.flex]}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            value={category}
            onChangeText={setCategory}
            placeholder="Brakes"
            placeholderTextColor={colors.textMuted}
          />
        </View>
        <View style={[styles.field, styles.flex]}>
          <Text style={styles.label}>Minutes</Text>
          <TextInput
            style={styles.input}
            value={durationMinutes}
            onChangeText={setDurationMinutes}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <Text style={styles.sectionTitle}>Pricing type</Text>
      <View style={styles.priceTypes}>
        {PRICE_TYPES.map((option) => {
          const active = priceType === option.value;
          return (
            <TouchableOpacity
              key={option.value}
              style={[styles.priceType, active && styles.priceTypeActive]}
              onPress={() => setPriceType(option.value)}
              activeOpacity={0.8}
            >
              <Text style={styles.priceTypeLabel}>{option.label}</Text>
              <Text style={styles.priceTypeDesc}>{option.desc}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{priceLabel} (USD)</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          keyboardType="decimal-pad"
          placeholder="79.99"
          placeholderTextColor={colors.textMuted}
        />
      </View>
      <TouchableOpacity
        style={styles.checkboxRow}
        onPress={() => setPublished((value) => !value)}
      >
        <View style={[styles.checkbox, published && styles.checkboxActive]}>
          {published && <View style={styles.checkboxInner} />}
        </View>
        <Text style={styles.checkboxLabel}>Publish as active and bookable</Text>
      </TouchableOpacity>
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
      <View style={styles.footer}>
        <Button
          title={submitting ? 'Saving…' : 'Save service'}
          onPress={() => void save()}
          disabled={submitting}
          style={styles.saveButton}
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: { paddingBottom: 110 },
  field: { marginBottom: spacing.md },
  flex: { flex: 1 },
  label: {
    fontSize: typography.size.sm,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.size.base,
  },
  row: { flexDirection: 'row', gap: spacing.md },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  priceTypes: {
    flexDirection: 'column',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  priceType: {
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: colors.divider,
  },
  priceTypeActive: {
    borderColor: colors.accent,
    backgroundColor: colors.surfaceLight,
  },
  priceTypeLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  priceTypeDesc: {
    fontSize: typography.size.sm,
    marginTop: 5,
    color: colors.textSecondary,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: spacing.sm,
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.textMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 1,
    backgroundColor: colors.text,
  },
  checkboxLabel: { fontSize: typography.size.base, color: colors.text },
  error: { color: colors.error, marginTop: spacing.md },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  saveButton: { width: '100%' },
});
