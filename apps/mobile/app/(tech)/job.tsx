import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag, Card, Divider } from '@/components/ui';
import { ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { TECH_JOB_DETAIL } from '@/lib/mock-data';

const FLOW = ['CHECKED_IN', 'IN_PROGRESS', 'WAITING_FOR_APPROVAL', 'WORK_COMPLETED', 'READY_FOR_PICKUP'] as const;
const LABELS: Record<string, string> = {
  CHECKED_IN: 'CHECKED IN',
  IN_PROGRESS: 'IN PROGRESS',
  WAITING_FOR_APPROVAL: 'WAITING APPROVAL',
  WORK_COMPLETED: 'WORK COMPLETE',
  READY_FOR_PICKUP: 'READY FOR PICKUP',
};
const NEXT: Record<string, string> = {
  CHECKED_IN: 'Start work',
  IN_PROGRESS: 'Request approval',
  WAITING_FOR_APPROVAL: 'Mark work complete',
  WORK_COMPLETED: 'Ready for pickup',
  READY_FOR_PICKUP: 'Completed',
};

export default function TechJobScreen() {
  const router = useRouter();
  const [jobStatus, setJobStatus] = useState<string>('IN_PROGRESS');

  const canAdvance = FLOW.indexOf(jobStatus as any) < FLOW.length - 1;
  const nextLabel = NEXT[jobStatus];

  const advance = () => {
    const idx = FLOW.indexOf(jobStatus as any);
    if (idx < FLOW.length - 1) {
      setJobStatus(FLOW[idx + 1]);
    }
  };

  return (
    <ScreenWrapper style={styles.wrapper}>
      <ScreenHeader title="Work order" />

      <Card style={styles.jobCard}>
        <View style={styles.jobHeader}>
          <Text style={styles.service}>{TECH_JOB_DETAIL.service}</Text>
          <Tag label={LABELS[jobStatus]} variant="accent" />
        </View>
        <Divider style={styles.divider} />
        <View style={styles.detailsGrid}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Customer</Text>
            <Text style={styles.detailValue}>{TECH_JOB_DETAIL.customer}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Vehicle</Text>
            <Text style={styles.detailValue}>{TECH_JOB_DETAIL.vehicle}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Plate</Text>
            <Text style={styles.detailValue}>{TECH_JOB_DETAIL.plate}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Odometer</Text>
            <Text style={styles.detailValue}>{TECH_JOB_DETAIL.miles}</Text>
          </View>
        </View>
      </Card>

      <View style={styles.noteBox}>
        <Text style={styles.noteLabel}>Customer note</Text>
        <Text style={styles.noteText}>{TECH_JOB_DETAIL.note}</Text>
      </View>

      <Text style={styles.sectionTitle}>Actions</Text>

      <View style={styles.actionsList}>
        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => router.push('/(tech)/inspection')}
          activeOpacity={0.8}
        >
          <View>
            <Text style={styles.actionLabel}>Inspection checklist</Text>
            <Text style={styles.actionSub}>3 items need attention</Text>
          </View>
          <ChevronRightIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => router.push('/(tech)/photos')}
          activeOpacity={0.8}
        >
          <Text style={styles.actionLabel}>Photos & notes</Text>
          <ChevronRightIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => router.push('/(tech)/estimate-create')}
          activeOpacity={0.8}
        >
          <Text style={styles.actionLabel}>Recommend work / estimate</Text>
          <ChevronRightIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>
      </View>

      {canAdvance && (
        <View style={styles.footer}>
          <Button title={nextLabel} onPress={advance} style={styles.advanceButton} />
        </View>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 110,
  },
  jobCard: {
    marginBottom: spacing.lg,
  },
  jobHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  service: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.text,
  },
  divider: {
    marginVertical: spacing.lg,
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  detailItem: {
    minWidth: '45%',
    marginBottom: spacing.sm,
  },
  detailLabel: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
  },
  detailValue: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
    marginTop: 2,
  },
  noteBox: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.divider,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  noteLabel: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: 4,
  },
  noteText: {
    fontSize: typography.size.md,
    color: colors.text,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  actionsList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  actionLabel: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  actionSub: {
    fontSize: typography.size.sm,
    color: colors.accent,
    marginTop: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.lg,
    paddingBottom: spacing.xxl,
  },
  advanceButton: {
    width: '100%',
  },
});
