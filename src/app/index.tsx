import { ScrollView, View } from 'react-native'

import { CarrouselMovie } from '@/components/carrousel-movie'
import { Header } from '@/components/header'
import { MOVIES } from '@/utils/movies'

export default function Home() {
  return (
    <View className="flex-1">
      <Header />

      <ScrollView showsVerticalScrollIndicator={false}>
        <CarrouselMovie movies={MOVIES} title="Treading" />
      </ScrollView>
    </View>
  )
}
