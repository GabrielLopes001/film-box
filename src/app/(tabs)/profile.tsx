import { Image, ScrollView, View } from 'react-native'

import { FavoriteGenres } from '@/components/favorite-genres'
import { Preferences } from '@/components/preferences'
import { User } from '@/components/user'

export default function Profile() {
  return (
    <View className="flex-1 bg-neutral-900">
      <Image
        source={require('@/assets/banner.png')}
        className="w-full h-52 -mb-16"
        alt="banner"
      />
      <View className="flex-1 px-4 pb-4">
        <User />
        <ScrollView>
          <FavoriteGenres />
          <Preferences />
        </ScrollView>
      </View>
    </View>
  )
}
