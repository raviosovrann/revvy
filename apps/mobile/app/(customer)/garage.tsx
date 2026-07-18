import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag, Divider } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { VEHICLES } from '@/lib/mock-data';

export default function GarageScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Garage" showBack={false} />

      <View style={styles.list}>
        {VEHICLES.map((veh) => (
          <View key={veh.id} style={styles.vehicleCard}>
            <View style={styles.vehicleHeader}>
              <Text style={styles.vehicleNick}>{veh.nick}</Text>
              <Tag label={veh.plate} variant="neutral" style={styles.plateTag} />
            </View>
            <Text style={styles.vehicleTitle}>
              {veh.year} {veh.make} {veh.model}
            </Text>
            <Divider style={styles.vehicleDivider} />
            <View style={styles.vehicleStats}>
              <View>
                <Text style={styles.statLabel}>Mileage</Text>
                <Text style={styles.statValue}>{veh.miles}</Text>
              </View>
              <View>
                <Text style={styles.statLabel}>Last service</Text>
                <Text style={styles.statValue}>{veh.last}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>

      <Button title="+ Add a vehicle" variant="secondary" style={styles.addButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  vehicleCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  vehicleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  vehicleNick: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['3xl'],
    color: colors.text,
  },
  plateTag: {
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  vehicleTitle: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 4,
  },
  vehicleDivider: {
    marginVertical: spacing.lg,
  },
  vehicleStats: {
    flexDirection: 'row',
    gap: spacing.xxl,
  },
  statLabel: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  statValue: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.text,
    marginTop: 2,
  },
  addButton: {
    width: '100%',
    marginTop: spacing.lg,
  },
});
