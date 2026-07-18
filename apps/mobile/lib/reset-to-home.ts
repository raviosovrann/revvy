import { useNavigation } from '@react-navigation/native';

export function useResetToHome() {
  const navigation = useNavigation<any>();
  return () => {
    // Escape the nested tab navigator and pop back to the root landing screen.
    const root = navigation.getParent?.() ?? navigation;
    root.navigate('index');
  };
}
