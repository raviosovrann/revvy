import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { GridIcon, CalendarIcon, PeopleIcon, GearIcon, MenuIcon } from '@/components/icons';

const TAB_NAMES = ['index', 'calendar', 'customers', 'services', 'more'];

function TabBar({ state, descriptors, navigation }: any) {
  const icons: Record<string, React.ReactNode> = {
    index: <GridIcon size={20} color={colors.textMuted} />,
    calendar: <CalendarIcon size={20} color={colors.textMuted} />,
    customers: <PeopleIcon size={20} color={colors.textMuted} />,
    services: <GearIcon size={20} color={colors.textMuted} />,
    more: <MenuIcon size={20} color={colors.textMuted} />,
  };

  const activeIcons: Record<string, React.ReactNode> = {
    index: <GridIcon size={20} color={colors.accent} />,
    calendar: <CalendarIcon size={20} color={colors.accent} />,
    customers: <PeopleIcon size={20} color={colors.accent} />,
    services: <GearIcon size={20} color={colors.accent} />,
    more: <MenuIcon size={20} color={colors.accent} />,
  };

  const activeRouteName = state.routes[state.index]?.name;
  const visibleRoutes = state.routes.filter((route: any) => TAB_NAMES.includes(route.name));

  return (
    <View style={styles.tabBar}>
      {visibleRoutes.map((route: any) => {
        const { options } = descriptors[route.key];
        const label = options.tabBarLabel || options.title || route.name;
        const isFocused = activeRouteName === route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tab}
            activeOpacity={0.8}
          >
            <View style={styles.tabContent}>
              {isFocused ? activeIcons[route.name] : icons[route.name]}
              <Text style={[styles.tabLabel, isFocused && styles.tabLabelActive]} numberOfLines={1}>
                {label}
              </Text>
            </View>
            {isFocused && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function OwnerLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Overview' }} />
      <Tabs.Screen name="calendar" options={{ title: 'Calendar' }} />
      <Tabs.Screen name="customers" options={{ title: 'Customers' }} />
      <Tabs.Screen name="services" options={{ title: 'Services' }} />
      <Tabs.Screen name="more" options={{ title: 'More' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
    paddingBottom: 20,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    position: 'relative',
  },
  tabContent: {
    alignItems: 'center',
    gap: 4,
  },
  tabLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.secondary,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '10%',
    right: '10%',
    height: 2,
    backgroundColor: colors.secondary,
  },
});
