import RootNavigation from '@navigation/RootNavigation';
import React from 'react';
import {
  StatusBar,
  useColorScheme
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <GestureHandlerRootView>

    <SafeAreaProvider >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <RootNavigation />
    </SafeAreaProvider>
    </GestureHandlerRootView>
  );
};

export default App;

