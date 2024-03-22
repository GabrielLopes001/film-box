import { router } from 'expo-router'
import { FlatList, Text, View } from 'react-native'

import { CardCast } from '@/components/card-cast'

export type CastListProps = {
  id?: number
  profile_path: string
  character: string
  name: string
}

type Props = {
  cast: CastListProps[]
}

export function CastList({ cast }: Props) {
  function handleActorDetails(id: number) {
    router.navigate('/details/actor/' + id)
  }

  function renderItem({ item }: { item: CastListProps }) {
    return (
      <CardCast
        onPress={() => handleActorDetails(item.id)}
        character={item.character}
        name={item.name}
        profile_path={item.profile_path}
      />
    )
  }
  return (
    <View className="flex-1 my-4">
      <Text className="mx-4 mb-5 text-lg text-white">Top Cast</Text>
      <FlatList
        data={cast}
        keyExtractor={(item) => String(item.id)}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 15,
          gap: 14,
          alignItems: 'center',
        }}
        renderItem={renderItem}
      />
    </View>
  )
}
