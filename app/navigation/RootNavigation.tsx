import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '@appTypes/navigation';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home from '@screens/home/Home';
import { navigationRef } from '@utils/navigation';
import Splash from '@screens/splash/Splash';
import BottomTab from './BottomTab';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  return (
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown:false}}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="MainTab" component={BottomTab} />
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default RootNavigation;
