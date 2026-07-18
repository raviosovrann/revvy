import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag, Card } from '@/components/ui';
import { ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { DEFAULT_APPOINTMENTS, TIMELINE } from '@/lib/mock-data';

export default function AppointmentDetailScreen() {
  const router = useRouter();
  const { apptId } = useLocalSearchParams<{ apptId?: string }>();
  const appt = DEFAULT_APPOINTMENTS.find((a) => a.id === apptId) || DEFAULT_APPOINTMENTS[0];

  return (
    <ScreenWrapper>
      <ScreenHeader title="Appointment" />

      <Card style={styles.apptCard}>
        <View style={styles.apptHeader}>
          <Text style={styles.service}>{appt.service}</Text>
          <Tag label={appt.status} variant={appt.statusClass === 'accent' ? 'accent' : 'neutral'} style={styles.statusTag} />
        </View>
        <Text style={styles.apptMeta}>
          {appt.vehicle} · {appt.shop}
        </Text>
        <Text style={styles.apptMeta}>{appt.when}</Text>
      </Card>

      <Text style={styles.sectionTitle}>Progress</Text>

      <View style={styles.timeline}>
        {TIMELINE.map((step, idx) => (
          <View key={idx} style={styles.timelineRow}>
            <View style={styles.timelineLineCol}>
              <View
                style={[
                  styles.timelineDot,
                  {
                    backgroundColor: step.done ? colors.accent : colors.bg,
                    borderColor: step.done ? colors.accent : colors.textMuted,
                  },
                ]}
              />
              {idx < TIMELINE.length - 1 && (
                <View
                  style={[
                    styles.timelineLine,
                    { backgroundColor: idx < 3 ? colors.accent : colors.surfaceLight },
                  ]}
                />
              )}
            </View>
            <View style={styles.timelineContent}>
              <Text style={[styles.timelineLabel, !step.done && { color: colors.textMuted }]}>
                {step.label}
              </Text>
              {step.time ? <Text style={styles.timelineTime}>{step.time}</Text> : null}
            </View>
          </View>
        ))}
      </View>

      {appt.hasEstimate && (
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: 'rgba(79, 70, 229, 0.12)', borderLeftColor: colors.accent }]}
          onPress={() => router.push('/(customer)/estimate')}
          activeOpacity={0.8}
        >
          <View>
            <Text style={[styles.actionTitle, { color: colors.accent }]}>Estimate needs your approval</Text>
            <Text style={[styles.actionSub, { color: colors.accent }]}>$424.61 · 3 items</Text>
          </View>
          <ChevronRightIcon size={18} color={colors.accent} />
        </TouchableOpacity>
      )}

      {appt.hasInvoice && (
        <TouchableOpacity
          style={[styles.actionCard, { backgroundColor: colors.surface, borderLeftColor: colors.text }]}
          onPress={() => router.push('/(customer)/invoice')}
          activeOpacity={0.8}
        >
          <View>
            <Text style={styles.actionTitle}>View invoice & receipt</Text>
            <Text style={styles.actionSub}>$105.61 · Invoice #1042</Text>
          </View>
          <ChevronRightIcon size={18} color={colors.textMuted} />
        </TouchableOpacity>
      )}
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  apptCard: {
    marginBottom: spacing.xl,
  },
  apptHeader: {
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
  statusTag: {
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  apptMeta: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  timeline: {
    flexDirection: 'column',
  },
  timelineRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    alignItems: 'stretch',
  },
  timelineLineCol: {
    alignItems: 'center',
    width: 16,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderWidth: 2,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    minHeight: 14,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: spacing.lg,
  },
  timelineLabel: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  timelineTime: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 1,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderLeftWidth: 3,
    marginTop: spacing.sm,
  },
  actionTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  actionSub: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 2,
  },
});
