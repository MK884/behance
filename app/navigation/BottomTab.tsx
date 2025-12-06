import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MainTabParamList } from '@appTypes/navigation'
import Home from '@screens/home/Home'
import Notification from '@screens/notifications/Notification'
import Message from '@screens/messages/Message'
import Profile from '@screens/profile/Profile'
import { MyTabBar } from '@components/MyTab'

const BottomTab = () => {

  const Tab = createBottomTabNavigator<MainTabParamList>();
  return (
    <Tab.Navigator initialRouteName='Home' screenOptions={{headerShown:false}} tabBar={prop => <MyTabBar {...prop} />}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Notifications" component={Notification} />
      <Tab.Screen name="Messages" component={Message} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}

export default BottomTab