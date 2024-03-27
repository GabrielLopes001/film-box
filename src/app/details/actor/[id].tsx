import { useLocalSearchParams, useNavigation } from 'expo-router'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'

import { ActorDetails, ActorDetailsProps } from '@/components/actor-details'
import { CardMovieList, CardMovieListProps } from '@/components/card-movie-list'
import {
  HeaderButton,
  HeaderIcon,
  HeaderRoot,
  HeaderText,
} from '@/components/header'
import { api } from '@/services/api'
import { MOVIES } from '@/utils/movies'

export default function Actor() {
  const [actorDetails, setActorDetails] = useState<ActorDetailsProps>(
    {} as ActorDetailsProps,
  )
  const [actorMovies, setActorMovies] = useState<CardMovieListProps[]>(
    [] as CardMovieListProps[],
  )
  const { id } = useLocalSearchParams()

  const navigation = useNavigation()

  async function fetchActorDetails() {
    try {
      const response = await api.get(`/person/${id}`)
      const data = response.data
      setActorDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchActorMovies() {
    try {
      const response = await api.get(`/person/${id}/movie_credits`)
      const data = response.data.cast
      setActorMovies(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchActorDetails()
    fetchActorMovies()
  }, [])

  return (
    <ScrollView
      className="flex-1 bg-neutral-900"
      contentContainerStyle={{ paddingBottom: 20 }}
      showsVerticalScrollIndicator={false}
    >
      <View className="mb-8">
        <HeaderRoot>
          <HeaderButton onPress={() => navigation.goBack()}>
            <HeaderIcon>
              <ChevronLeftIcon color="white" size="28" strokeWidth={2.5} />
            </HeaderIcon>
          </HeaderButton>
          <HeaderText>
            <Text>Details</Text>
          </HeaderText>
          <HeaderText>
            <></>
          </HeaderText>
        </HeaderRoot>
      </View>

      <ActorDetails actor={actorDetails} />

      <CardMovieList movies={actorMovies} titlePage="Movies" />
    </ScrollView>
  )
}
