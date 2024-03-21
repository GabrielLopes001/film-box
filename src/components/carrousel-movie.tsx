import { router } from 'expo-router'
import { Dimensions, Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { MovieCard, MovieCardProps } from '@/components/card-movie'

const { width } = Dimensions.get('window')

export type CarrouselMovieProps = {
  movies: MovieCardProps[]
  title: string
}

export function CarrouselMovie({ movies, title }: CarrouselMovieProps) {
  // id 1096197

  function handleMovieDetails(id: number) {
    router.navigate('/details/movie/' + id)
  }

  function renderItem({ item }: { item: MovieCardProps }) {
    return (
      <MovieCard
        poster_path={item.poster_path}
        onPress={() => handleMovieDetails(item.id)}
      />
    )
  }

  return (
    <View className="mb-8">
      <Text className="mx-4 mb-5 text-xl text-white">{title}</Text>
      <Carousel
        data={movies}
        firstItem={1}
        renderItem={renderItem}
        inactiveSlideOpacity={0.6}
        sliderWidth={width}
        itemWidth={width * 0.62}
        slideStyle={{ display: 'flex', alignItems: 'center' }}
      />
    </View>
  )
}
