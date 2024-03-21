/* eslint-disable camelcase */
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'

import { CardMovieList } from '@/components/card-movie-list'
import { CastList, CastListProps } from '@/components/cast-list'
import { HeaderButton, HeaderRoot, HeaderText } from '@/components/header'
import { MovieDetails, MovieDetailsProps } from '@/components/movie-details'
import { api } from '@/services/api'
import { MOVIES } from '@/utils/movies'

export default function Movie() {
  const [moviesDetails, setMoviesDetails] = useState<MovieDetailsProps>(
    {} as MovieDetailsProps,
  )
  const [moviesCredits, setMoviesCredits] = useState<CastListProps[]>(
    [] as CastListProps[],
  )

  const { id } = useLocalSearchParams()
  const navigation = useNavigation()

  async function fetchMoviesDetails() {
    try {
      const response = await api.get(`/movie/${id}`)
      const data = response.data
      setMoviesDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchMovieCredits() {
    try {
      const response = await api.get(`/movie/${id}/credits`)
      const data = response.data.cast
      setMoviesCredits(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchMoviesDetails()
    fetchMovieCredits()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
      className="flex-1 bg-neutral-900"
    >
      <View className="mb-4">
        <HeaderRoot>
          <HeaderButton onPress={() => navigation.goBack()}>
            <ChevronLeftIcon color="white" size="28" strokeWidth={2.5} />
          </HeaderButton>
          <HeaderText>Details</HeaderText>
          <HeaderButton>
            <HeartIcon color="white" size="35" />
          </HeaderButton>
        </HeaderRoot>
      </View>

      <MovieDetails movie={moviesDetails} />

      <CastList cast={moviesCredits} />
      <CardMovieList movies={MOVIES} titlePage="Similar Movies" />
    </ScrollView>
  )
}
