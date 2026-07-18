import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { WEEK_DAYS, TODAY_SCHEDULE } from '@/lib/mock-data';

export default function OwnerCalendarScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Calendar" showBack={false} />

      <View style={styles.weekRow}>
        {WEEK_DAYS.map((wd, idx) => (
          <TouchableOpacity
            key={idx}
            style={[
              styles.dayCell,
              {
                backgroundColor: wd.today ? colors.accent : 'transparent',
              },
            ]}
            activeOpacity={0.8}
          >
            <Text style={[styles.dayLetter, wd.today && { color: colors.text }]}>{wd.d}</Text>
            <Text style={[styles.dayNumber, wd.today && { color: colors.text }]}>{wd.n}</Text>
            {wd.appts > 0 && (
              <View
                style={[
                  styles.dayDot,
                  { backgroundColor: wd.today ? colors.text : colors.accent },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Friday, Jul 18 · 6 appointments</Text>

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
  weekRow: {
    flexDirection: 'row',
    gap: 2,
    backgroundColor: colors.divider,
    borderWidth: 1,
    borderColor: colors.divider,
    marginBottom: spacing.xl,
  },
  dayCell: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    gap: 3,
  },
  dayLetter: {
    fontSize: typography.size.xs,
    opacity: 0.7,
    color: colors.text,
  },
  dayNumber: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.text,
  },
  dayDot: {
    width: 4,
    height: 4,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  scheduleList: {
    marginTop: spacing.md,
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
