import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { colors, spacing, typography } from '@/constants/theme';
import { ChevronLeftIcon } from '@/components/icons';

export function ScreenHeader({ title, showBack = true }: { title: string; showBack?: boolean }) {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.8}>
          <ChevronLeftIcon size={22} color={colors.text} />
        </TouchableOpacity>
      )}
      <Text style={[styles.title, !showBack && styles.titleNoBack]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    minHeight: 52,
  },
  backButton: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -spacing.sm,
    marginRight: spacing.sm,
  },
  title: {
    flex: 1,
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['4xl'],
    color: colors.text,
    letterSpacing: -0.5,
    lineHeight: 28,
  },
  titleNoBack: {
    marginLeft: 0,
  },
});
