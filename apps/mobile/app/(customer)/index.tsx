import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScreenWrapper } from '@/components/screen-wrapper';
import { ScreenHeader } from '@/components/header';
import { Tag, Card } from '@/components/ui';
import { SearchIcon } from '@/components/icons';
import { colors, spacing, typography } from '@/constants/theme';
import { SHOPS } from '@/lib/mock-data';

export default function CustomerHomeScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredShops = SHOPS.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.area.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenWrapper>
      <ScreenHeader title="Find a shop" showBack={false} />

      <View style={styles.searchContainer}>
        <SearchIcon size={16} color={colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search shops, neighborhood, ZIP"
          placeholderTextColor={colors.textMuted}
          value={search}
          onChangeText={setSearch}
        />
      </View>

      <View style={styles.tags}>
        <Tag label="Near me" variant="accent" />
        <Tag label="Oil change" variant="neutral" />
        <Tag label="Brakes" variant="neutral" />
        <Tag label="Inspection" variant="neutral" />
      </View>

      <Text style={styles.resultCount}>{filteredShops.length} shops nearby</Text>

      <View style={styles.shopList}>
        {filteredShops.map((shop) => (
          <TouchableOpacity
            key={shop.id}
            style={styles.shopRow}
            onPress={() => router.push({ pathname: '/(customer)/shop', params: { shopId: shop.id } })}
            activeOpacity={0.8}
          >
            <View style={styles.shopInitials}>
              <Text style={styles.shopInitialsText}>{shop.initials}</Text>
            </View>
            <View style={styles.shopInfo}>
              <View style={styles.shopHeader}>
                <Text style={styles.shopName}>{shop.name}</Text>
                <Text style={styles.shopDist}>{shop.dist}</Text>
              </View>
              <Text style={styles.shopArea}>{shop.area}</Text>
              <Text style={[styles.shopHours, { color: shop.open ? colors.accent : colors.textMuted }]}>
                {shop.hours}
              </Text>
              <View style={styles.shopSpecialties}>
                {shop.specialties.map((sp) => (
                  <Tag key={sp} label={sp} variant="neutral" style={styles.specialtyTag} />
                ))}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
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
  tags: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
    flexWrap: 'wrap',
  },
  resultCount: {
    fontSize: typography.size.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  shopList: {
    borderTopWidth: 2,
    borderTopColor: colors.divider,
  },
  shopRow: {
    flexDirection: 'row',
    gap: spacing.lg,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    alignItems: 'flex-start',
  },
  shopInitials: {
    width: 46,
    height: 46,
    backgroundColor: colors.text,
    alignItems: 'center',
    justifyContent: 'center',
  },
  shopInitialsText: {
    color: colors.bg,
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: 18,
  },
  shopInfo: {
    flex: 1,
    minWidth: 0,
  },
  shopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  shopName: {
    fontFamily: typography.heading.fontFamily,
    fontWeight: typography.heading.fontWeight,
    fontSize: typography.size.xl,
    color: colors.text,
  },
  shopDist: {
    fontSize: typography.size.sm,
    color: colors.textMuted,
  },
  shopArea: {
    fontSize: typography.size.md,
    color: colors.textSecondary,
    marginTop: 1,
  },
  shopHours: {
    fontSize: typography.size.sm,
    marginTop: 4,
  },
  shopSpecialties: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  specialtyTag: {
    paddingVertical: 3,
    paddingHorizontal: 6,
  },
});
