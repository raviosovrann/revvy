import { Tabs } from 'expo-router';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, typography } from '@/constants/theme';
import { HomeIcon, CalendarIcon, CarIcon, UserIcon } from '@/components/icons';

const TAB_NAMES = ['index', 'appointments', 'garage', 'profile'];

function TabBar({ state, descriptors, navigation }: any) {
  const icons: Record<string, React.ReactNode> = {
    index: <HomeIcon size={20} color={colors.textMuted} />,
    appointments: <CalendarIcon size={20} color={colors.textMuted} />,
    garage: <CarIcon size={20} color={colors.textMuted} />,
    profile: <UserIcon size={20} color={colors.textMuted} />,
  };

  const activeIcons: Record<string, React.ReactNode> = {
    index: <HomeIcon size={20} color={colors.accent} />,
    appointments: <CalendarIcon size={20} color={colors.accent} />,
    garage: <CarIcon size={20} color={colors.accent} />,
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

export default function CustomerLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="appointments" options={{ title: 'Appointments' }} />
      <Tabs.Screen name="garage" options={{ title: 'Garage' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />

      <Tabs.Screen name="shop" options={{ href: null }} />
      <Tabs.Screen name="service" options={{ href: null }} />
      <Tabs.Screen name="book-vehicle" options={{ href: null }} />
      <Tabs.Screen name="book-slot" options={{ href: null }} />
      <Tabs.Screen name="book-review" options={{ href: null }} />
      <Tabs.Screen name="book-done" options={{ href: null }} />
      <Tabs.Screen name="appointment-detail" options={{ href: null }} />
      <Tabs.Screen name="estimate" options={{ href: null }} />
      <Tabs.Screen name="invoice" options={{ href: null }} />
      <Tabs.Screen name="pay" options={{ href: null }} />
      <Tabs.Screen name="receipt" options={{ href: null }} />
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
