import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { Button } from '@/components/ui';
import { CheckIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';

export default function TechCompleteScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper scroll={false} style={styles.center}>
      <View style={styles.iconCircle}>
        <CheckIcon size={40} color={colors.bg} strokeWidth={3} />
      </View>
      <Text style={styles.title}>Job complete</Text>
      <Text style={styles.subtitle}>
        Front desk has been notified to invoice and mark the vehicle ready for pickup.
      </Text>
      <Button title="Back to work order" onPress={() => router.replace('/(tech)/job')} style={styles.button} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xxl,
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
  },
  button: {
    width: '100%',
    marginTop: spacing.xl,
  },
});
