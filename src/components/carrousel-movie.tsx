import { router } from 'expo-router'
import { Dimensions, Image, Text, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'

import { MovieCardImage, MovieCardRoot } from '@/components/card-movie'
import { CardMovieListProps } from '@/components/card-movie-list'

const { height, width } = Dimensions.get('window')

export type CarrouselMovieProps = {
  movies: CardMovieListProps[]
  title: string
}

export function CarrouselMovie({ movies, title }: CarrouselMovieProps) {
  // id 1096197

  function handleMovieDetails(id: number) {
    router.navigate('/details/movie/' + id)
  }

  function renderItem({ item }: { item: CardMovieListProps }) {
    return (
      <MovieCardRoot
        activeOpacity={0.7}
        onPress={() => handleMovieDetails(item.id)}
      >
        <MovieCardImage>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
            }}
            alt="poster"
            style={{ width: width * 0.6, height: height * 0.4 }}
            className="rounded-3xl"
          />
        </MovieCardImage>
      </MovieCardRoot>
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
