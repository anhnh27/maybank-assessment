import {useCallback} from 'react';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const useHomeScreen = () => {
  const animatedValue = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(animatedValue.value, {
        duration: 500,
      }),
    };
  });

  const handleOnFocus = useCallback(() => {
    animatedValue.value = 1;
  }, [animatedValue]);

  const handleOnBlur = useCallback(() => {
    animatedValue.value = 0;
  }, [animatedValue]);

  return {
    animatedStyle,
    handleOnFocus,
    handleOnBlur,
  };
};

export default useHomeScreen;
