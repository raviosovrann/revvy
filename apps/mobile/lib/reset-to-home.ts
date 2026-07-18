import { useNavigation } from '@react-navigation/native';

export function useResetToHome() {
  const navigation = useNavigation<any>();
  return () => {
    // Walk up to the root navigator (past any nested stacks/tabs) and navigate to the landing screen.
    let root = navigation;
    while (root.getParent?.()) {
      root = root.getParent();
    }
    root.navigate('index');
  };
}
