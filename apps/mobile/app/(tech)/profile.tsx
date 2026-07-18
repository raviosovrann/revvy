import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { ChevronRightIcon, LogoutIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';

export default function TechProfileScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper>
      <ScreenHeader title="Profile" showBack={false} />

      <View style={styles.identity}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>CD</Text>
        </View>
        <Text style={styles.name}>Carlos Diaz</Text>
        <Text style={styles.role}>Lead Technician · Grand Street Auto</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
          <Text style={styles.menuText}>Skill certification</Text>
          <ChevronRightIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
          <Text style={styles.menuText}>Hours & performance</Text>
          <ChevronRightIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
          <Text style={styles.menuText}>Notifications</Text>
          <ChevronRightIcon size={16} color={colors.textMuted} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuRow} activeOpacity={0.8}>
          <Text style={styles.menuText}>Dark mode</Text>
          <Text style={styles.menuHint}>On</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.logout}
        onPress={() => router.replace('/')}
        activeOpacity={0.8}
      >
        <LogoutIcon size={18} color={colors.error} />
        <Text style={styles.logoutText}>Switch role</Text>
      </TouchableOpacity>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  identity: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  avatar: {
    width: 74,
    height: 74,
    borderRadius: 37,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.bg,
  },
  name: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['2xl'],
    color: colors.text,
  },
  role: {
    fontSize: typography.size.md,
    color: colors.textMuted,
    marginTop: 2,
  },
  menu: {
    marginTop: spacing.lg,
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
  menuText: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  menuHint: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
  },
  logoutText: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.error,
  },
});
