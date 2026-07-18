import { useNavigation } from '@react-navigation/native';

export function useResetToHome() {
  const navigation = useNavigation<any>();
  return () => {
    // Walk up through nested stacks/tabs and stop at the navigator that owns the landing route.
    let current: any = navigation;
    while (current) {
      const names = current.getState?.().routeNames ?? [];
      if (names.includes('index')) {
        current.navigate('index');
        return;
      }
      current = current.getParent?.();
    }
  };
}
