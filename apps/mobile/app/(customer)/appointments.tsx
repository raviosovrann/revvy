import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { DEFAULT_APPOINTMENTS } from '@/lib/mock-data';

export default function AppointmentsScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  const displayed = DEFAULT_APPOINTMENTS.filter((a) =>
    filter === 'upcoming' ? a.status !== 'COMPLETED' : a.status === 'COMPLETED'
  );

  return (
    <ScreenWrapper>
      <ScreenHeader title="Appointments" showBack={false} />

      <View style={styles.segmented}>
        <TouchableOpacity
          style={[styles.segment, filter === 'upcoming' && styles.segmentActive]}
          onPress={() => setFilter('upcoming')}
        >
          <Text style={[styles.segmentText, filter === 'upcoming' && styles.segmentTextActive]}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.segment, filter === 'past' && styles.segmentActive]}
          onPress={() => setFilter('past')}
        >
          <Text style={[styles.segmentText, filter === 'past' && styles.segmentTextActive]}>
            Past
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.list}>
        {displayed.map((appt) => (
          <TouchableOpacity
            key={appt.id}
            style={[styles.card, { borderLeftColor: appt.tone === 'accent' ? colors.accent : colors.surfaceLight }]}
            onPress={() => router.push({ pathname: '/(customer)/appointment-detail', params: { apptId: appt.id } })}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.service}>{appt.service}</Text>
              <Tag label={appt.status} variant={appt.statusClass === 'accent' ? 'accent' : 'neutral'} style={styles.statusTag} />
            </View>
            <Text style={styles.vehicle}>{appt.vehicle}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.shop}>{appt.shop}</Text>
              <Text style={styles.dot}>·</Text>
              <Text style={styles.when}>{appt.when}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  segmented: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: spacing.sm,
    marginBottom: spacing.lg,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  segmentActive: {
    backgroundColor: colors.surfaceLight,
  },
  segmentText: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.text,
  },
  list: {
    flexDirection: 'column',
    gap: spacing.md,
  },
  card: {
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
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
  vehicle: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 4,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: spacing.sm,
  },
  shop: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  dot: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  when: {
    fontSize: typography.size.sm,
    fontWeight: '600',
    color: colors.text,
  },
});
