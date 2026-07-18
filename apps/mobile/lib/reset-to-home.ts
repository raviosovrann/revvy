import { useNavigation } from '@react-navigation/native';

export function useResetToHome() {
  const navigation = useNavigation<any>();
  return () => {
    // Escape the nested tab navigator and reset the root stack back to the landing screen.
    const root = navigation.getParent?.() ?? navigation;
    root.reset({
      index: 0,
      routes: [{ name: 'index' }],
    });
  };
}
