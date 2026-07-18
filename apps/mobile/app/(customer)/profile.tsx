import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { PROFILE_ROWS } from '@/lib/mock-data';

export default function CustomerProfileScreen() {
  const router = useRouter();
  return (
    <ScreenWrapper>
      <ScreenHeader title="Profile" showBack={false} />

      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>MR</Text>
        </View>
        <View>
          <Text style={styles.name}>Maya Rivera</Text>
          <Text style={styles.phone}>+1 (917) 555·0148</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        {PROFILE_ROWS.map((row) => (
          <TouchableOpacity key={row} style={styles.menuRow} activeOpacity={0.8}>
            <Text style={styles.menuLabel}>{row}</Text>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <Button title="Switch role" variant="ghost" onPress={() => router.replace('/')} style={styles.signOut} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    marginBottom: spacing.xl,
  },
  avatar: {
    width: 60,
    height: 60,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.bg,
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 22,
  },
  name: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['3xl'],
    color: colors.text,
  },
  phone: {
    fontSize: typography.size.md,
    color: colors.textMuted,
    marginTop: 2,
  },
  menuList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  menuLabel: {
    fontSize: typography.size.base,
    color: colors.text,
  },
  signOut: {
    marginTop: spacing.lg,
    paddingHorizontal: 0,
  },
});
