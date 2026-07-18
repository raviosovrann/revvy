import { useNavigation } from '@react-navigation/native';

export function useResetToHome() {
  const navigation = useNavigation<any>();
  return () => {
    // Reset the root navigator directly to the landing screen.
    navigation.resetRoot({
      index: 0,
      routes: [{ name: 'index' }],
    });
  };
}
