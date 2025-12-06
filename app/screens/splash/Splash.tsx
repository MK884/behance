import Screen from '@components/Screen';
import { replace } from '@utils/navigation';
import { scale } from '@utils/scale';
import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

const Splash = () => {
  const { width, height } = Dimensions.get('screen');

  const bgScale = useSharedValue(1);
  const particalOpacity = useSharedValue(0);
  const barWidth = useSharedValue(0);

  const splashAnimation = () => {
    bgScale.value = withDelay(1000, withTiming(1.2, { duration: 1000 }));
    particalOpacity.value = withDelay(600, withTiming(1, { duration: 1000 }));
    barWidth.value = withTiming(1, { duration: 2500 });
  };

  const bgSplashAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: bgScale.value }],
    };
  });

  const particalAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: particalOpacity.value,
    };
  });

  const barAnimatedStyle = useAnimatedStyle(() => {
    const width = interpolate(barWidth.value, [0, 1], [0, 100]);

    return { width: `${width}%` };
  });

  React.useEffect(() => {
    splashAnimation();

    const timeId = setTimeout(() => {
      replace('MainTab', { screen: 'Home' });
    }, 2500);

    return () => clearTimeout(timeId);
  }, []);

  return (
    <Screen edges={['left', 'right']}>
      <Animated.View style={[StyleSheet.absoluteFill, bgSplashAnimatedStyle]}>
        <LinearGradient
          style={{ flex: 1 }}
          colors={['#0b0e1cff', '#352a39ff']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          // colors={['#D7AEEE', '#94BBE9', '#94BBE9']}
        />
      </Animated.View>

      {/* particals */}
      <View style={[StyleSheet.absoluteFill]}>
        {Array.from({ length: 30 }).map((_, index) => {
          return (
            <Animated.View
              key={index}
              style={[
                styles.particle,
                particalAnimatedStyle,
                {
                  bottom: Math.random() * height,
                  left: Math.random() * width,
                  animationDelay: `${Math.random() * 4000}ms`,
                },
              ]}
            />
          );
        })}

        {/* Loading bar */}
        <View style={[styles.progressContainer]}>
          <Text style={[styles.loadingText]}>Loading...</Text>

          <View style={[styles.barContainer]}>
            <Animated.View style={[styles.innerBar, barAnimatedStyle]} />
          </View>
        </View>
      </View>
    </Screen>
  );
};

export default Splash;

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    width: scale(4),
    height: scale(4),
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: scale(2),
  },
  innerBar: {
    backgroundColor: '#fff',
    height: '100%',
  },
  progressContainer: {
    position: 'absolute',
    bottom: scale(80),
    right: '50%',
    transform: [{ translateX: '50%' }],
    alignItems: 'center',
    gap: scale(10),
  },
  barContainer: {
    height: scale(6),
    width: scale(200),
    backgroundColor: '#dadada',
    borderRadius: scale(9),
    overflow: 'hidden',
  },
  loadingText: {
    color: 'white',
    fontSize: scale(22),
  },
});
