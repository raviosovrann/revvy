import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { PLANS } from '@/lib/mock-data';

export default function OwnerSubscriptionScreen() {
  const [plan, setPlan] = useState('growth');
  const currentPlan = PLANS.find((p) => p.id === plan);

  return (
    <ScreenWrapper>
      <ScreenHeader title="Subscription" />

      <View style={styles.currentPlan}>
        <Text style={styles.currentPlanLabel}>Current plan</Text>
        <View style={styles.currentPlanRow}>
          <Text style={styles.currentPlanName}>{currentPlan?.name}</Text>
          <Text style={styles.currentPlanPrice}>{currentPlan?.price}/mo</Text>
        </View>
        <Text style={styles.currentPlanBilling}>Next billing Aug 18, 2026 · Visa ···· 4242</Text>
      </View>

      <Text style={styles.sectionTitle}>Change plan</Text>

      <View style={styles.plans}>
        {PLANS.map((p) => {
          const active = p.id === plan;
          return (
            <View
              key={p.id}
              style={[
                styles.planCard,
                {
                  backgroundColor: active ? 'rgba(79, 70, 229, 0.12)' : colors.surface,
                  borderColor: active ? colors.accent : 'transparent',
                },
              ]}
            >
              <View style={styles.planHeader}>
                <Text style={styles.planName}>{p.name}</Text>
                <Text style={styles.planPrice}>
                  {p.price}
                  <Text style={styles.planPeriod}>/mo</Text>
                </Text>
              </View>
              <View style={styles.features}>
                {p.features.map((feat, idx) => (
                  <View key={idx} style={styles.featureRow}>
                    <CheckIcon size={14} color={colors.accent} strokeWidth={3} />
                    <Text style={styles.featureText}>{feat}</Text>
                  </View>
                ))}
              </View>
              <Button
                title={active ? 'Current plan' : `Switch to ${p.name}`}
                variant={active ? 'secondary' : 'primary'}
                onPress={() => setPlan(p.id)}
                style={styles.planButton}
              />
            </View>
          );
        })}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  currentPlan: {
    backgroundColor: colors.text,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  currentPlanLabel: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    opacity: 0.7,
    color: colors.bg,
  },
  currentPlanRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  currentPlanName: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 28,
    color: colors.bg,
  },
  currentPlanPrice: {
    fontSize: typography.size.base,
    color: colors.bg,
    opacity: 0.8,
  },
  currentPlanBilling: {
    fontSize: typography.size.sm,
    color: colors.bg,
    opacity: 0.7,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  plans: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  planCard: {
    borderWidth: 2,
    padding: spacing.lg,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  planName: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['3xl'],
    color: colors.text,
  },
  planPrice: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['3xl'],
    color: colors.text,
  },
  planPeriod: {
    fontSize: typography.size.sm,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  features: {
    marginTop: spacing.md,
    flexDirection: 'column',
    gap: 5,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  featureText: {
    fontSize: typography.size.md,
    color: colors.text,
  },
  planButton: {
    width: '100%',
    marginTop: spacing.md,
  },
});
