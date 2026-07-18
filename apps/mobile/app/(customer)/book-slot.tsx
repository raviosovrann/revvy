import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { colors, spacing, typography } from '@/constants/theme';
import { SLOT_DAYS } from '@/lib/mock-data';

export default function BookSlotScreen() {
  const router = useRouter();
  const { serviceId, shopId, vehicleId, slot } = useLocalSearchParams<{
    serviceId?: string;
    shopId?: string;
    vehicleId?: string;
    slot?: string;
  }>();
  const selectedSlot = slot;

  return (
    <ScreenWrapper>
      <ScreenHeader title="Choose a time" />

      <View style={styles.progress}>
        <View style={[styles.progressBar, styles.progressActive]} />
        <View style={[styles.progressBar, styles.progressActive]} />
        <View style={styles.progressBar} />
      </View>

      {SLOT_DAYS.map((day, dayIdx) => (
        <View key={dayIdx} style={styles.daySection}>
          <Text style={styles.dayLabel}>{day.label}</Text>
          <View style={styles.slotGrid}>
            {day.times.map((time) => {
              const selected = selectedSlot === time;
              return (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.slot,
                    {
                      borderColor: selected ? colors.accent : colors.divider,
                      backgroundColor: selected ? colors.accent : 'transparent',
                    },
                  ]}
                  onPress={() =>
                    router.push({
                      pathname: '/(customer)/book-review',
                      params: { serviceId, shopId, vehicleId, slot: time },
                    })
                  }
                  activeOpacity={0.8}
                >
                  <Text
                    style={[
                      styles.slotText,
                      { color: selected ? colors.text : colors.text },
                    ]}
                  >
                    {time}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}
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
  daySection: {
    marginBottom: spacing.xl,
  },
  dayLabel: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  slotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slot: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1.5,
  },
  slotText: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.sm,
  },
});
