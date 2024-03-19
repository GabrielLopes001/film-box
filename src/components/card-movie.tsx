/* eslint-disable camelcase */
import {
  Dimensions,
  Image,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
} from 'react-native'

export type MovieCardProps = TouchableNativeFeedbackProps & {
  poster_path: string
}

const { width, height } = Dimensions.get('window')

export function MovieCard({ poster_path, ...rest }: MovieCardProps) {
  return (
    <TouchableNativeFeedback {...rest}>
      <Image
        source={{ uri: poster_path }}
        alt="poster"
        style={{ width: width * 0.6, height: height * 0.4 }}
        className="rounded-3xl"
      />
    </TouchableNativeFeedback>
  )
}
