import { router } from 'expo-router'
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  PressableProps,
  Text,
  View,
} from 'react-native'

import { MovieCardImage, MovieCardRoot } from '@/components/card-movie'

export type CardMovieListProps = {
  id: number
  poster_path: string
  title: string
}

type Props = PressableProps & {
  titlePage: string
  movies: CardMovieListProps[]
}

const { width, height } = Dimensions.get('window')

export function CardMovieList({ titlePage, movies, ...rest }: Props) {
  function renderItem({ item }: { item: CardMovieListProps }) {
    return (
      <View className="mr-4 space-y-1">
        <MovieCardRoot
          activeOpacity={0.7}
          onPress={() => router.navigate(`/details/movie/${item.id}`)}
        >
          <MovieCardImage>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w185${item.poster_path}`,
              }}
              style={{ width: width * 0.33, height: height * 0.22 }}
              alt="poster"
              className="rounded-3xl"
            />
          </MovieCardImage>
        </MovieCardRoot>
      </View>
    )
  }

  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row mx-4 mb-3 justify-between">
        <Text className="text-xl text-white">{titlePage}</Text>

        <Pressable {...rest}>
          <Text className="text-lg text-orange-400">Veja Todos</Text>
        </Pressable>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
