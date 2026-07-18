import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag, Divider } from '@/components/ui';
import { ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { OWNER_STATS, TODAY_SCHEDULE, ONBOARD_STEPS } from '@/lib/mock-data';

export default function OwnerOverviewScreen() {
  const router = useRouter();
  const [onboard, setOnboard] = useState<Record<string, boolean>>({
    profile: true,
    hours: true,
    service: false,
    team: false,
    subscription: false,
  });

  const onboardDone = Object.values(onboard).filter(Boolean).length;
  const onboardTotal = Object.keys(onboard).length;
  const onboardPct = Math.round((onboardDone / onboardTotal) * 100);
  const onboardComplete = onboardDone === onboardTotal;

  return (
    <ScreenWrapper>
      <ScreenHeader title="Grand Street Auto" showBack={false} />

      <View style={styles.headerRow}>
        <Tag label="PUBLISHED" variant="accent" />
        <Text style={styles.date}>Friday, Jul 18</Text>
      </View>

      <View style={styles.statsGrid}>
        {OWNER_STATS.map((stat, idx) => (
          <View key={idx} style={styles.statCard}>
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
            <Text style={styles.statSub}>{stat.sub}</Text>
          </View>
        ))}
      </View>

      {!onboardComplete && (
        <TouchableOpacity
          style={styles.onboardCard}
          onPress={() => router.push('/(owner)/onboarding')}
          activeOpacity={0.8}
        >
          <View>
            <Text style={styles.onboardTitle}>Finish setting up · {onboardPct}%</Text>
            <Text style={styles.onboardSub}>
              {onboardDone} of {onboardTotal} steps done
            </Text>
          </View>
          <ChevronRightIcon size={18} color={colors.accent} />
        </TouchableOpacity>
      )}

      <View style={styles.scheduleHeader}>
        <Text style={styles.sectionTitle}>Today's schedule</Text>
        <TouchableOpacity onPress={() => router.push('/(owner)/calendar')}>
          <Text style={styles.calendarLink}>Calendar →</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.scheduleList}>
        {TODAY_SCHEDULE.map((job, idx) => (
          <View key={idx} style={styles.scheduleRow}>
            <View style={styles.timeCol}>
              <Text style={styles.time}>{job.time}</Text>
              <Text style={styles.period}>{job.period}</Text>
            </View>
            <View style={[styles.toneBar, { backgroundColor: job.tone === 'accent' ? colors.accent : colors.surfaceLight }]} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobService}>{job.service}</Text>
              <Text style={styles.jobCustomer}>
                {job.customer} · {job.vehicle}
              </Text>
            </View>
            <Tag label={job.status} variant={job.statusClass === 'accent' ? 'accent' : 'neutral'} style={styles.statusTag} />
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  date: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
    backgroundColor: colors.divider,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.lg,
  },
  statCard: {
    width: '49%',
    backgroundColor: colors.bg,
    padding: spacing.lg,
  },
  statValue: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 26,
    letterSpacing: -1,
    color: colors.text,
  },
  statLabel: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    marginTop: 2,
    color: colors.text,
  },
  statSub: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 2,
  },
  onboardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    backgroundColor: 'rgba(79, 70, 229, 0.12)',
    borderLeftWidth: 3,
    borderLeftColor: colors.accent,
    marginBottom: spacing.xl,
  },
  onboardTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.accent,
  },
  onboardSub: {
    fontSize: typography.size.sm,
    color: colors.accent,
    opacity: 0.8,
    marginTop: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
  },
  calendarLink: {
    fontSize: typography.size.sm,
    color: colors.accent,
  },
  scheduleList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  scheduleRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    alignItems: 'center',
  },
  timeCol: {
    width: 52,
    alignItems: 'flex-end',
  },
  time: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    lineHeight: 18,
    color: colors.text,
  },
  period: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  toneBar: {
    width: 3,
    alignSelf: 'stretch',
  },
  jobInfo: {
    flex: 1,
    minWidth: 0,
  },
  jobService: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  jobCustomer: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
});
