import '@/styles/global.css'

import { Slot } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'

import { MovieProvider } from '@/contexts/MoviesContext'
import { UserContextProvider } from '@/contexts/UserContext'

export default function Layout() {
  return (
    <MovieProvider>
      <UserContextProvider>
        <View style={{ flex: 1, backgroundColor: '#171717' }}>
          <StatusBar style="light" />
          <Slot />
        </View>
      </UserContextProvider>
    </MovieProvider>
  )
}
