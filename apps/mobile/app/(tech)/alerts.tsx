import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { colors, spacing, typography } from '@/constants/theme';
import { TECH_NOTIFS } from '@/lib/mock-data';

export default function TechAlertsScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Alerts" showBack={false} />

      <View style={styles.list}>
        {TECH_NOTIFS.map((n, idx) => (
          <View key={idx} style={styles.notifRow}>
            <View style={[styles.dot, { backgroundColor: n.accent === 'accent' ? colors.accent : colors.textMuted }]} />
            <View style={styles.notifContent}>
              <View style={styles.notifHeader}>
                <Text style={styles.notifTitle}>{n.title}</Text>
                <Text style={styles.notifWhen}>{n.when}</Text>
              </View>
              <Text style={styles.notifBody}>{n.body}</Text>
            </View>
          </View>
        ))}
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  list: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  notifRow: {
    flexDirection: 'row',
    gap: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  dot: {
    width: 8,
    height: 8,
    marginTop: 5,
  },
  notifContent: {
    flex: 1,
  },
  notifHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  notifTitle: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.base,
    color: colors.text,
  },
  notifWhen: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    flex: 'none' as any,
  },
  notifBody: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
