import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Button, Tag } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';

export default function BookDoneScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper scroll={false} style={styles.center}>
      <View style={styles.iconCircle}>
        <CheckIcon size={40} color={colors.bg} strokeWidth={3} />
      </View>
      <Text style={styles.title}>You're booked</Text>
      <Text style={styles.subtitle}>
        Brake Pad Replacement at Grand Street Auto, Today · 2:30 PM. Your appointment is confirmed.
      </Text>

      <View style={styles.confirmationBox}>
        <Text style={styles.confirmationLabel}>Confirmation</Text>
        <Text style={styles.confirmationRef}>#GS-1203</Text>
      </View>

      <Button title="View my appointments" onPress={() => router.replace('/(customer)/appointments')} style={styles.button} />
      <Button title="Back to shops" variant="ghost" onPress={() => router.replace('/(customer)')} style={styles.ghostButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
    textAlign: 'center' as any,
  },
  iconCircle: {
    width: 76,
    height: 76,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['5xl'],
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: typography.size.base,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    maxWidth: 280,
  },
  confirmationBox: {
    width: '100%',
    backgroundColor: colors.surface,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  confirmationLabel: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  confirmationRef: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.xl,
    color: colors.text,
  },
  button: {
    width: '100%',
    marginTop: spacing.xl,
  },
  ghostButton: {
    marginTop: spacing.sm,
  },
});
