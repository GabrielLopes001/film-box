import '@/styles/global.css'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import { AuthContextProvider } from '@/contexts/auth-context'

export default function Layout() {
  return (
    <AuthContextProvider>
      <View style={{ flex: 1, backgroundColor: '#171717' }}>
        <StatusBar style="light" />
        <Slot />
      </View>
    </AuthContextProvider>
  )
}
