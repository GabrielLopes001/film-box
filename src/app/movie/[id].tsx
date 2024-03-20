/* eslint-disable camelcase */
import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { Header } from '@/components/header'
import { MovieDetails, MovieDetailsProps } from '@/components/movie-details'
import { api } from '@/services/api'

const { width, height } = Dimensions.get('window')

export default function Movie() {
  const [moviesDetails, setMoviesDetails] = useState<MovieDetailsProps>(
    {} as MovieDetailsProps,
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

  useEffect(() => {
    fetchMoviesDetails()
  }, [])

  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="w-full">
        <View>
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${moviesDetails.poster_path}`,
            }}
            alt="poster"
            style={{ width, height: height * 0.55 }}
          />
        </View>
      </View>

      <View className="space-y-3">
        <MovieDetails movie={moviesDetails} />
      </View>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text className="text-3xl text-white">Retornar {id}</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}
