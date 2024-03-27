import { router, useNavigation } from 'expo-router'
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
import { api } from '@/services/api'
import { MOVIES } from '@/utils/movies'

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

  async function fetchNewMovies() {
    try {
      const response = await api.get('/movie/now_playing')
      const data = response.data.results
      setNewMovies(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchUpComingMovies() {
    try {
      const response = await api.get('/movie/upcoming')
      const data = response.data.results
      setUpComingMovies(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchTopRatedMovies() {
    try {
      const response = await api.get('/movie/top_rated')
      const data = response.data.results
      setTopRatedMovies(data)
    } catch (error) {
      console.log(error)
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

      <ScrollView showsVerticalScrollIndicator={false}>
        <CarrouselMovie movies={newMovies} title="Treading" />
        <CardMovieList movies={upComingMovies} titlePage="UpComing" />
        <CardMovieList movies={topRatedMovies} titlePage="TopRated" />
      </ScrollView>
    </View>
  )
}