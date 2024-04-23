import { router } from 'expo-router'
import { useState } from 'react'
import { Dimensions, FlatList, Image, Text, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'

import {
  MovieCardImage,
  MovieCardRoot,
  MovieCardText,
} from '@/components/card-movie'
import { CardMovieListProps } from '@/components/card-movie-list'
import { HeaderButton, HeaderRoot, HeaderText } from '@/components/header'
import { Loading } from '@/components/loading'
import { useMovie } from '@/hooks/useMovie'

const { width, height } = Dimensions.get('window')

export default function Favorite() {
  const [isLoading, setIsLoading] = useState(false)

  const { allFavoriteMovies } = useMovie()

  function renderItem({ item }: { item: CardMovieListProps }) {
    return (
      <MovieCardRoot
        onPress={() => router.navigate(`/details/movie/${item.id}`)}
      >
        <View className="mb-4 p-1 justify-center">
          <MovieCardImage>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
              }}
              style={{ width: width * 0.44, height: height * 0.3 }}
              alt="poster"
              className="rounded-3xl"
            />
          </MovieCardImage>
          <MovieCardText className="ml-1 text-neutral-300">
            {item.title.length > 22
              ? item.title.slice(0, 22) + '...'
              : item.title}
          </MovieCardText>
        </View>
      </MovieCardRoot>
    )
  }

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="mb-4">
        <HeaderRoot>
          <HeaderButton onPress={() => router.navigate('/(tabs)/')}>
            <ChevronLeftIcon color="white" size="28" strokeWidth={2.5} />
          </HeaderButton>
          <HeaderText>Favorites</HeaderText>
          <HeaderText>
            <></>
          </HeaderText>
        </HeaderRoot>
      </View>

      {isLoading ? (
        <Loading />
      ) : allFavoriteMovies.length > 0 ? (
        <View className="flex-1">
          <FlatList
            data={allFavoriteMovies}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 55,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <View className="flex-row justify-center">
          <Text className="text-white">
            IMAGE OF EMPTY LIST FAVORITES MOVIES
          </Text>
        </View>
      )}
    </View>
  )
}
