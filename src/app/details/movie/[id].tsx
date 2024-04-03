/* eslint-disable camelcase */
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'

import { CardMovieList, CardMovieListProps } from '@/components/card-movie-list'
import { CastList, CastListProps } from '@/components/cast-list'
import { HeaderButton, HeaderRoot, HeaderText } from '@/components/header'
import { Loading } from '@/components/loading'
import { MovieDetails, MovieDetailsProps } from '@/components/movie-details'
import { api } from '@/services/api'
import { MOVIES } from '@/utils/movies'

export default function Movie() {
  const [moviesDetails, setMoviesDetails] = useState<MovieDetailsProps>(
    {} as MovieDetailsProps,
  )
  const [similarMovies, setSimilarMovies] = useState<CardMovieListProps[]>(
    [] as CardMovieListProps[],
  )
  const [moviesCredits, setMoviesCredits] = useState<CastListProps[]>(
    [] as CastListProps[],
  )

  const [isLoading, setIsLoading] = useState(true)

  const { id } = useLocalSearchParams()

  async function fetchMoviesDetails() {
    try {
      const response = await api.get(`/movie/${id}`)
      const data = response.data
      setIsLoading(true)
      setMoviesDetails(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchMovieCredits() {
    try {
      const response = await api.get(`/movie/${id}/credits`)
      const data = response.data.cast
      setIsLoading(true)
      setMoviesCredits(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchSimilarMovie() {
    try {
      const response = await api.get(`/movie/${id}/similar`)
      const data = response.data.results
      setIsLoading(true)
      setSimilarMovies(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchMoviesDetails()
    fetchMovieCredits()
    fetchSimilarMovie()
  }, [])

  return (
    <View className="flex-1 bg-neutral-900">
      <View className="mb-4">
        <HeaderRoot>
          <HeaderButton onPress={() => router.navigate('/')}>
            <ChevronLeftIcon color="white" size="28" strokeWidth={2.5} />
          </HeaderButton>
          <HeaderText>Details</HeaderText>
          <HeaderButton>
            <HeartIcon color="white" size="35" />
          </HeaderButton>
        </HeaderRoot>
      </View>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          <MovieDetails movie={moviesDetails} />

          <CastList cast={moviesCredits} />
          <CardMovieList movies={similarMovies} titlePage="Similar Movies" />
        </ScrollView>
      )}
    </View>
  )
}
