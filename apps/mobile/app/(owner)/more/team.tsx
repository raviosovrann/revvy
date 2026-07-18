import { View, Text, StyleSheet } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button, Tag } from '@/components/ui';
import { colors, spacing, typography } from '@/constants/theme';
import { TEAM, INVITATIONS } from '@/lib/mock-data';

export default function OwnerTeamScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Team" />

      <Text style={styles.sectionTitle}>Members</Text>
      <View style={styles.list}>
        {TEAM.map((m, idx) => (
          <View key={idx} style={styles.memberRow}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{m.initials}</Text>
            </View>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{m.name}</Text>
              <Text style={styles.memberMeta}>{m.meta}</Text>
            </View>
            <Tag label={m.role} variant={m.roleClass as any} style={styles.roleTag} />
          </View>
        ))}
      </View>

      <Text style={[styles.sectionTitle, { marginTop: spacing.xl }]}>Pending invitations</Text>
      <View style={styles.list}>
        {INVITATIONS.map((inv, idx) => (
          <View key={idx} style={styles.memberRow}>
            <View style={styles.memberInfo}>
              <Text style={styles.memberName}>{inv.name}</Text>
              <Text style={styles.memberMeta}>
                {inv.contact} · {inv.role}
              </Text>
            </View>
            <Tag label="PENDING" variant="outline" style={styles.roleTag} />
          </View>
        ))}
      </View>

      <Button title="+ Invite a team member" style={styles.inviteButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  list: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  memberRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.bg,
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 14,
  },
  memberInfo: {
    flex: 1,
    minWidth: 0,
  },
  memberName: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  memberMeta: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  roleTag: {
    paddingVertical: 2,
    paddingHorizontal: 5,
  },
  inviteButton: {
    width: '100%',
    marginTop: spacing.xl,
  },
});
