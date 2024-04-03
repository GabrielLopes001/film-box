import { Tabs } from 'expo-router'
import { View } from 'react-native'
import {
  HeartIcon,
  HomeIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline'
import {
  HeartIcon as HeartIconSolid,
  HomeIcon as HomeIconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from 'react-native-heroicons/solid'

export default function TabsLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#f97316',
          tabBarInactiveTintColor: '#525252',
          tabBarStyle: {
            backgroundColor: '#262626',
            borderTopColor: '#262626',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: ({ size, color, focused }) =>
              focused ? (
                <HomeIconSolid size={size} color={color} />
              ) : (
                <HomeIcon size={size} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            tabBarIcon: ({ size, color, focused }) =>
              focused ? (
                <HeartIconSolid size={size} color={color} />
              ) : (
                <HeartIcon size={size} color={color} />
              ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, color, focused }) =>
              focused ? (
                <UserCircleIconSolid size={size} color={color} />
              ) : (
                <UserCircleIcon size={size} color={color} />
              ),
          }}
        />
      </Tabs>
    </View>
  )
}
