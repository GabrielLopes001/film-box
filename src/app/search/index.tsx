import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { Dimensions, FlatList, Image, Text, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'

import {
  MovieCardImage,
  MovieCardRoot,
  MovieCardText,
} from '@/components/card-movie'
import { CardMovieListProps } from '@/components/card-movie-list'
import { HeaderButton, HeaderIcon, HeaderTextInput } from '@/components/header'
import { Loading } from '@/components/loading'
import { api } from '@/services/api'

const { width, height } = Dimensions.get('window')

export default function Search() {
  const [moviesResults, setMoviesResults] = useState<CardMovieListProps[]>(
    [] as CardMovieListProps[],
  )

  const [isLoading, setIsLoading] = useState(false)

  async function fetchSearchMovie(value: string) {
    if (value && value.length > 3) {
      try {
        const response = await api.get(`/search/movie?query=${value}`)
        const data = response.data.results
        setIsLoading(true)
        setMoviesResults(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const handleSearchMovie = useCallback(fetchSearchMovie, [])

  function renderItem({ item }: { item: CardMovieListProps }) {
    return (
      <MovieCardRoot
        onPress={() => router.navigate(`/details/movie/${item.id}`)}
      >
        <View className="mb-4 space-y-2">
          <MovieCardImage>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
              }}
              style={{ width: width * 0.44, height: height * 0.3 }}
              alt="poster"
              className="rounded-3xl space-y-4"
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
    <View className="flex-1">
      <View className="mb-3 mx-4 flex-row items-center justify-between rounded-full border border-neutral-200 mt-16">
        <HeaderTextInput
          onChangeText={handleSearchMovie}
          placeholder="Buscar Filme"
        />
        <View className="m-1 rounded-full bg-neutral-500 p-3">
          <HeaderButton onPress={() => router.navigate('/')}>
            <HeaderIcon>
              <XMarkIcon color="white" size="28" strokeWidth={2.5} />
            </HeaderIcon>
          </HeaderButton>
        </View>
      </View>
      {isLoading ? (
        <Loading />
      ) : moviesResults.length > 0 ? (
        <View className="flex-1">
          <FlatList
            data={moviesResults}
            keyExtractor={(item) => item.id}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 15,
              paddingBottom: 55,
              margin: 12,
            }}
            renderItem={renderItem}
          />
        </View>
      ) : (
        <View className="flex-row justify-center">
          <Text className="text-white">IMAGE OF EMPTY LIST MOVIES</Text>
        </View>
      )}
    </View>
  )
}
