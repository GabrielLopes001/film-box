/* eslint-disable camelcase */
import { Text, View } from 'react-native'

export type MovieDetailsProps = {
  poster_path?: string
  title: string
  overview: string
  status: string
  release_date: string
  runtime: number
}

type Props = {
  movie: MovieDetailsProps
}

export function MovieDetails({ movie }: Props) {
  return (
    <View>
      <Text className="text-center text-3xl font-bold tracking-wider text-white">
        {movie.title}
      </Text>
      <Text className="text-center text-base font-semibold text-neutral-400">
        {movie.status} / {movie.release_date} / {movie.runtime} min
      </Text>
      <Text className="mx-4 text-center tracking-wide text-neutral-400">
        {movie.overview}
      </Text>
    </View>
  )
}
