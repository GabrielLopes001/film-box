import { router } from 'expo-router'
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  PressableProps,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native'

export type CardMovieListProps = {
  id?: number
  poster_path: string
  title: string
}

type Props = PressableProps & {
  titlePage: string
  movies: CardMovieListProps[]
}

const { width, height } = Dimensions.get('window')

export function CardMovieList({ titlePage, movies, ...rest }: Props) {
  function handleMovieDetails(id: number) {
    router.navigate('/movie/' + id)
  }

  return (
    <View className="mb-8 space-y-4">
      <View className="flex-row mx-4 justify-between">
        <Text className="text-xl text-white">{titlePage}</Text>
        <Pressable {...rest}>
          <Text className="text-lg text-orange-400">See All</Text>
        </Pressable>
      </View>
      <FlatList
        data={movies}
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <TouchableNativeFeedback
            onPress={() => handleMovieDetails(item.id)}
            key={item.title}
          >
            <View className="mr-4 space-y-1">
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w185${item.poster_path}`,
                }}
                style={{ width: width * 0.33, height: height * 0.22 }}
                alt="poster"
                className="rounded-3xl"
              />
            </View>
          </TouchableNativeFeedback>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}
