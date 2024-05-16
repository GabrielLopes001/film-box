/* eslint-disable camelcase */
import { router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ChevronLeftIcon, HeartIcon } from 'react-native-heroicons/outline'

import { CardMovieList, CardMovieListProps } from '@/components/card-movie-list'
import { CastList, CastListProps } from '@/components/cast-list'
import { HeaderButton, HeaderRoot, HeaderText } from '@/components/header'
import { Loading } from '@/components/loading'
import { MovieDetails, MovieDetailsProps } from '@/components/movie-details'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/services/api'

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

  const { addFavoriteMovie, removeFavoriteMovie, favoriteMovies } = useAuth()

  const { id } = useLocalSearchParams()

  function handleFavoriteMovie(movieId: number) {
    if (favoriteMovies.includes(movieId)) {
      removeFavoriteMovie(moviesDetails.id)
    } else {
      addFavoriteMovie(moviesDetails.id)
    }
  }

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
          <HeaderButton onPress={() => router.navigate('/(tabs)/')}>
            <ChevronLeftIcon color="white" size="28" strokeWidth={2.5} />
          </HeaderButton>
          <HeaderText>Detalhes</HeaderText>
          <HeaderButton onPress={() => handleFavoriteMovie(moviesDetails.id)}>
            <HeartIcon
              color={
                favoriteMovies.includes(moviesDetails.id) ? 'orange' : 'white'
              }
              size="35"
            />
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
          <CardMovieList movies={similarMovies} titlePage="Filmes Similares" />
        </ScrollView>
      )}
    </View>
  )
}
