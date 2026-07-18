import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { WrenchIcon, BellIcon, UserIcon } from '@/components/icons';

const TAB_NAMES = ['index', 'alerts', 'profile'];

function TabBar({ state, descriptors, navigation }: any) {
  const icons: Record<string, React.ReactNode> = {
    index: <WrenchIcon size={20} color={colors.textMuted} />,
    alerts: <BellIcon size={20} color={colors.textMuted} />,
    profile: <UserIcon size={20} color={colors.textMuted} />,
  };

  const activeIcons: Record<string, React.ReactNode> = {
    index: <WrenchIcon size={20} color={colors.accent} />,
    alerts: <BellIcon size={20} color={colors.accent} />,
    profile: <UserIcon size={20} color={colors.accent} />,
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

export default function TechLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Jobs' }} />
      <Tabs.Screen name="alerts" options={{ title: 'Alerts' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      <Tabs.Screen name="job" options={{ href: null }} />
      <Tabs.Screen name="inspection" options={{ href: null }} />
      <Tabs.Screen name="photos" options={{ href: null }} />
      <Tabs.Screen name="estimate-create" options={{ href: null }} />
      <Tabs.Screen name="complete" options={{ href: null }} />
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
    fontSize: 10,
    fontWeight: '700',
    color: colors.textMuted,
    marginTop: 2,
    textAlign: 'center',
  },
  tabLabelActive: {
    color: colors.accent,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    left: '20%',
    right: '20%',
    height: 2,
    backgroundColor: colors.accent,
  },
});
