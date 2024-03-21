import '@/styles/global.css'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native'

export default function Layout() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#171717' }}>
      <StatusBar style="light" />
      <Slot />
    </SafeAreaView>
  )
}
