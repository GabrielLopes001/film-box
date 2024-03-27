import { Tabs } from 'expo-router'
import { View } from 'react-native'
import {
  HeartIcon,
  HomeIcon,
  UserCircleIcon,
} from 'react-native-heroicons/outline'

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
            tabBarIcon: ({ size, color }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            tabBarIcon: ({ size, color }) => (
              <HeartIcon size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ({ size, color }) => (
              <UserCircleIcon size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  )
}
