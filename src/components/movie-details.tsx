/* eslint-disable camelcase */
import { Dimensions, Image, Text, View } from 'react-native'
import {
  CalendarIcon,
  ClockIcon,
  StarIcon,
} from 'react-native-heroicons/outline'
import { twMerge } from 'tailwind-merge'

export type MovieDetailsProps = {
  id: number
  poster_path?: string
  title: string
  overview: string
  vote_average: number
  release_date: string
  runtime: number
}

type Props = {
  movie: MovieDetailsProps
}

const { height, width } = Dimensions.get('window')

export function MovieDetails({ movie }: Props) {
  function getYear(date: string) {
    const year = new Date(date).getFullYear()
    return year
  }

  return (
    <View className="flex-1">
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
        }}
        alt="poster"
        style={{ width, height: height * 0.55 }}
      />
      <View className="my-2">
        <Text className="text-center text-3xl font-bold tracking-wider text-white">
          {movie?.title}
        </Text>
      </View>
      <View className="w-full flex-row gap-8 justify-center items-center mb-2">
        <Text className="text-base font-semibold text-neutral-400">
          <CalendarIcon size="14" color="gray" /> {getYear(movie?.release_date)}
        </Text>

        <Text className=" text-base font-semibold text-neutral-400">
          <ClockIcon size="14" color="gray" /> {movie?.runtime} min
        </Text>
        <Text
          className={twMerge(
            ' text-base font-semibold text-neutral-400',
            movie?.vote_average > 7.0 ? 'text-orange-400' : 'text-neutral-400',
          )}
        >
          <StarIcon
            size="14"
            color={movie?.vote_average > 7.0 ? 'orange' : 'gray'}
          />

          {movie?.vote_average?.toFixed(2)}
        </Text>
      </View>
      <Text className="mx-4 text-center tracking-wide text-neutral-400">
        {movie?.overview}
      </Text>
    </View>
  )
}
