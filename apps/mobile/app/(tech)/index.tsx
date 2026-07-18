import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { TECH_JOBS } from '@/lib/mock-data';

export default function TechJobsScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScreenHeader title="My jobs" showBack={false} />

      <View style={styles.headerRow}>
        <Text style={styles.techName}>Carlos Diaz · Grand Street Auto</Text>
      </View>

      <Text style={styles.sectionTitle}>Assigned today</Text>

      <View style={styles.list}>
        {TECH_JOBS.map((job) => (
          <TouchableOpacity
            key={job.id}
            style={[styles.jobCard, { borderLeftColor: job.tone === 'accent' ? colors.accent : colors.surfaceLight }]}
            onPress={() => router.push('/(tech)/job')}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.service}>{job.service}</Text>
              <Tag label={job.status} variant={job.statusClass === 'accent' ? 'accent' : 'neutral'} style={styles.statusTag} />
            </View>
            <Text style={styles.vehicle}>{job.vehicle}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.customer}>{job.customer}</Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.bay}>{job.bay}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: spacing.lg,
  },
  techName: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  list: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  jobCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderLeftWidth: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  service: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.lg,
    color: colors.text,
  },
  statusTag: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  vehicle: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 5,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  customer: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  dot: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  bay: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text,
  },
});
