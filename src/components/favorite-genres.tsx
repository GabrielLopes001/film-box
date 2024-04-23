import { Text, View } from 'react-native'

import { GENRES } from '@/utils/genres'

export function FavoriteGenres() {
  return (
    <View className="w-full">
      <Text className="text-white font-bold text-xl mt-6 mb-6">
        Gêneros Favoritos
      </Text>

      <View className="flex-row w-full flex-wrap gap-3">
        {GENRES.map((genre) => {
          return (
            <View
              key={genre.id}
              className="flex flex-row items-center rounded-full px-2 py-1 text-xs font-semibold bg-gray-500"
            >
              <Text className="font-medium text-center text-xs text-white">
                {genre.name}
              </Text>
            </View>
          )
        })}
      </View>
    </View>
  )
}
