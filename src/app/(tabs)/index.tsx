import { router } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, View } from 'react-native'
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'

import { CardMovieList, CardMovieListProps } from '@/components/card-movie-list'
import { CarrouselMovie } from '@/components/carrousel-movie'
import {
  HeaderButton,
  HeaderIcon,
  HeaderRoot,
  HeaderText,
} from '@/components/header'
import { Loading } from '@/components/loading'
import { api } from '@/services/api'

export default function Home() {
  const [newMovies, setNewMovies] = useState<CardMovieListProps[]>(
    [] as CardMovieListProps[],
  )
  const [upComingMovies, setUpComingMovies] = useState<CardMovieListProps[]>(
    [] as CardMovieListProps[],
  )
  const [topRatedMovies, setTopRatedMovies] = useState<CardMovieListProps[]>(
    [] as CardMovieListProps[],
  )
  const [isLoading, setIsLoading] = useState(true)

  async function fetchNewMovies() {
    try {
      const response = await api.get('/movie/now_playing')
      const data = response.data.results
      setIsLoading(true)
      setNewMovies(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchUpComingMovies() {
    try {
      const response = await api.get('/movie/upcoming')
      const data = response.data.results
      setIsLoading(true)
      setUpComingMovies(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchTopRatedMovies() {
    try {
      const response = await api.get('/movie/top_rated')
      const data = response.data.results
      setIsLoading(true)
      setTopRatedMovies(data)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchNewMovies()
    fetchUpComingMovies()
    fetchTopRatedMovies()
  }, [])

  return (
    <View className="flex-1 bg-neutral-900">
      <HeaderRoot>
        <HeaderButton>
          <HeaderIcon>
            <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
          </HeaderIcon>
        </HeaderButton>
        <HeaderText>Movie</HeaderText>
        <HeaderButton onPress={() => router.navigate('/search/')}>
          <HeaderIcon>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </HeaderIcon>
        </HeaderButton>
      </HeaderRoot>

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <CarrouselMovie movies={newMovies} title="Treading" />
          <CardMovieList movies={upComingMovies} titlePage="UpComing" />
          <CardMovieList movies={topRatedMovies} titlePage="TopRated" />
        </ScrollView>
      )}
    </View>
  )
}
