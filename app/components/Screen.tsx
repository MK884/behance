import React from 'react';
import { useColorScheme, ViewStyle } from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';

const Screen = ({ children , style, edges=['top', 'bottom', 'left', 'right']}: { children: React.ReactNode, style?: ViewStyle , edges?: Edge[]}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor:  isDarkMode ? "#313131" : undefined}, style]} edges={edges}>
      {children}
    </SafeAreaView>
  );
};

export default Screen;

