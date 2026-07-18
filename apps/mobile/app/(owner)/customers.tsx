import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Button } from '@/components/ui';
import { SearchIcon, ChevronRightIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { CUSTOMERS } from '@/lib/mock-data';

export default function OwnerCustomersScreen() {
  return (
    <ScreenWrapper>
      <ScreenHeader title="Customers" showBack={false} />

      <View style={styles.searchContainer}>
        <SearchIcon size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search customers"
          placeholderTextColor={colors.textMuted}
        />
      </View>

      <View style={styles.list}>
        {CUSTOMERS.map((cust, idx) => (
          <TouchableOpacity key={idx} style={styles.customerRow} activeOpacity={0.8}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{cust.initials}</Text>
            </View>
            <View style={styles.customerInfo}>
              <Text style={styles.customerName}>{cust.name}</Text>
              <Text style={styles.customerMeta}>{cust.meta}</Text>
            </View>
            <ChevronRightIcon size={16} color={colors.textMuted} />
          </TouchableOpacity>
        ))}
      </View>

      <Button title="+ Add customer" variant="secondary" style={styles.addButton} />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: spacing.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  searchInput: {
    flex: 1,
    padding: spacing.md,
    color: colors.text,
    fontSize: typography.size.base,
  },
  list: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  customerRow: {
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
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.divider,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 14,
    color: colors.text,
  },
  customerInfo: {
    flex: 1,
    minWidth: 0,
  },
  customerName: {
    fontWeight: '600',
    fontSize: typography.size.base,
    color: colors.text,
  },
  customerMeta: {
    fontSize: typography.size.xs,
    color: colors.textMuted,
    marginTop: 1,
  },
  addButton: {
    width: '100%',
    marginTop: spacing.lg,
  },
});
