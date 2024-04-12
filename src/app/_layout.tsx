import '@/styles/global.css'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import { MovieProvider } from '@/contexts/MoviesContext'

export default function Layout() {
  return (
    <MovieProvider>
      <View style={{ flex: 1, backgroundColor: '#171717' }}>
        <StatusBar style="light" />
        <Slot />
      </View>
    </MovieProvider>
  )
}
