import { useNavigationContainerRef } from '@react-navigation/native';

export function useResetToHome() {
  const navigationRef = useNavigationContainerRef();
  return () => {
    if (navigationRef.isReady()) {
      navigationRef.resetRoot({
        index: 0,
        routes: [{ name: 'index' }],
      });
    }
  };
}