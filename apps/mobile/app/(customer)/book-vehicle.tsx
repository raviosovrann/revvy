import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag } from '@/components/ui';
import { CarIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { VEHICLES } from '@/lib/mock-data';

export default function BookVehicleScreen() {
  const router = useRouter();
  const { serviceId, shopId, vehicleId } = useLocalSearchParams<{
    serviceId?: string;
    shopId?: string;
    vehicleId?: string;
  }>();
  const selectedId = vehicleId || VEHICLES[0].id;

  return (
    <ScreenWrapper>
      <ScreenHeader title="Select vehicle" />

      <View style={styles.progress}>
        <View style={[styles.progressBar, styles.progressActive]} />
        <View style={styles.progressBar} />
        <View style={styles.progressBar} />
      </View>

      <Text style={styles.sectionTitle}>Which vehicle?</Text>

      <View style={styles.vehicleList}>
        {VEHICLES.map((veh) => {
          const selected = selectedId === veh.id;
          return (
            <TouchableOpacity
              key={veh.id}
              style={[
                styles.vehicleCard,
                { borderColor: selected ? colors.accent : 'transparent' },
              ]}
              onPress={() =>
                router.push({
                  pathname: '/(customer)/book-slot',
                  params: { serviceId, shopId, vehicleId: veh.id },
                })
              }
              activeOpacity={0.8}
            >
              <View style={styles.vehicleIcon}>
                <CarIcon size={22} color={colors.text} />
              </View>
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleTitle}>
                  {veh.year} {veh.make} {veh.model}
                </Text>
                <Text style={styles.vehicleSub}>
                  {veh.plate} · {veh.miles}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>

      <Button title="+ Add a vehicle" variant="secondary" style={styles.addButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  vehicleList: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderWidth: 2,
  },
  vehicleIcon: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  vehicleInfo: {
    flex: 1,
  },
  vehicleTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.lg,
    color: colors.text,
  },
  vehicleSub: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
  addButton: {
    width: '100%',
    marginTop: spacing.lg,
  },
});
