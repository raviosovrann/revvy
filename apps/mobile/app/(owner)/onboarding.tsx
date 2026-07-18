import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { ONBOARD_STEPS } from '@/lib/mock-data';

export default function OwnerOnboardingScreen() {
  const [steps, setSteps] = useState<Record<string, boolean>>({
    profile: true,
    hours: true,
    service: false,
    team: false,
    subscription: false,
  });

  const done = Object.values(steps).filter(Boolean).length;
  const total = Object.keys(steps).length;
  const pct = Math.round((done / total) * 100);

  const toggle = (key: string) => {
    setSteps((s) => ({ ...s, [key]: !s[key] }));
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Set up your shop" />

      <Text style={styles.intro}>Finish these steps to start accepting bookings.</Text>

      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.progressText}>
        {done} of {total} complete
      </Text>

      <View style={styles.steps}>
        {ONBOARD_STEPS.map(([key, title, sub]) => {
          const completed = steps[key];
          return (
            <View key={key} style={styles.stepCard}>
              <View
                style={[
                  styles.stepDot,
                  {
                    backgroundColor: completed ? colors.accent : colors.bg,
                    borderColor: completed ? colors.accent : colors.textMuted,
                  },
                ]}
              >
                {completed && <CheckIcon size={13} color={colors.bg} strokeWidth={3.5} />}
              </View>
              <View style={styles.stepText}>
                <Text style={[styles.stepTitle, { color: completed ? colors.textMuted : colors.text }]}>
                  {title}
                </Text>
                <Text style={styles.stepSub}>{sub}</Text>
              </View>
              <Button
                title={completed ? 'Done' : 'Start'}
                variant="ghost"
                onPress={() => toggle(key)}
                style={styles.stepButton}
              />
            </View>
          );
        })}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  intro: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.surfaceLight,
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent,
  },
  progressText: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginBottom: spacing.xl,
  },
  steps: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  stepDot: {
    width: 22,
    height: 22,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepText: {
    flex: 1,
    minWidth: 0,
  },
  stepTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
  },
  stepSub: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 1,
  },
  stepButton: {
    flex: 'none' as any,
  },
});
