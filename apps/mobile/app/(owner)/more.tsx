import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { MORE_MENU } from '@/lib/mock-data';

export default function OwnerMoreScreen() {
  const router = useRouter();

  const routes: Record<string, string> = {
    o_team: '/(owner)/team',
    o_invoices: '/(owner)/invoices',
    o_subscription: '/(owner)/subscription',
    o_settings: '/(owner)/settings',
    o_onboarding: '/(owner)/onboarding',
  };

  return (
    <ScreenWrapper>
      <ScreenHeader title="Menu" showBack={false} />

      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>GS</Text>
        </View>
        <View>
          <Text style={styles.shopName}>Grand Street Auto</Text>
          <Text style={styles.userInfo}>Sam Okafor · Owner</Text>
        </View>
      </View>

      <View style={styles.menuList}>
        {MORE_MENU.map((item) => (
          <TouchableOpacity
            key={item[0]}
            style={styles.menuRow}
            onPress={() => router.push(routes[item[0]] as any)}
            activeOpacity={0.8}
          >
            <View>
              <Text style={styles.menuLabel}>{item[1]}</Text>
              <Text style={styles.menuSub}>{item[2]}</Text>
            </View>
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
    paddingVertical: 4,
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 52,
    height: 52,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.bg,
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 18,
  },
  shopName: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size['3xl'],
    color: colors.text,
  },
  userInfo: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
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
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  menuSub: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
    marginTop: 1,
  },
  signOut: {
    marginTop: spacing.lg,
    paddingHorizontal: 0,
  },
});
