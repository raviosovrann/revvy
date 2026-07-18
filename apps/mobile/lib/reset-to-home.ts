import { useNavigation } from '@react-navigation/native';

export function useResetToHome() {
  const navigation = useNavigation<any>();
  return () => {
    // Reset the root navigation container to its initial route (the landing page).
    navigation.resetRoot({
      index: 0,
      routes: [{ name: 'index' }],
    });
  };
}