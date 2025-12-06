import { MainTabParamList } from '@appTypes/navigation';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { scale } from '@utils/scale';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import Feather from 'react-native-vector-icons/Feather';

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(PlatformPressable);

const getIconByRouteName = (
  routeName: keyof MainTabParamList,
  color: string,
) => {
  switch (routeName) {
    case 'Home':
      return <Feather name="home" color={color} size={scale(20)} />;
    case 'Messages':
      return <Feather name="message-circle" color={color} size={scale(20)} />;
    case 'Notifications':
      return <Feather name="bell" color={color} size={scale(20)} />;
    case 'Profile':
      return <Feather name="user" color={color} size={scale(20)} />;
    default:
      return null;
  }
};

export function MyTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <AnimatedTouchableOpacity
            layout={LinearTransition}
            key={index}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.tabItem,
              { backgroundColor: isFocused ? 'black' : 'transparent' },
            ]}
          >
            {/* <Feather name="home" color={isFocused ? "white"  : "black"} size={scale(16)} /> */}
            {getIconByRouteName(
              route.name as keyof MainTabParamList,
              isFocused ? 'white' : 'black',
            )}
            {isFocused && (
              <Text style={{ color: isFocused ? 'white' : 'black' }}>
                {label as string}
              </Text>
            )}
          </AnimatedTouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flexDirection: 'row',
    position: 'absolute',
    bottom: scale(35),
    width: '85%',
    alignSelf: 'center',
    borderRadius: scale(30),
    padding: scale(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(8),
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(6),
    padding: scale(10),
    backgroundColor: 'red',
    borderRadius: scale(20),
  },
});
