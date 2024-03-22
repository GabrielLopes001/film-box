/* eslint-disable camelcase */
import {
  Image,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

type CardCastProps = TouchableOpacityProps & {
  profile_path: string
  character: string
  name: string
}

export function CardCast({
  profile_path,
  character,
  name,
  ...rest
}: CardCastProps) {
  return (
    <TouchableOpacity className="mr-4 items-center" {...rest}>
      <View className="h-20 w-20 items-center overflow-hidden rounded-full border border-neutral-400">
        <Image
          className="h-24 w-20 rounded-2xl"
          source={{
            uri: `https://image.tmdb.org/t/p/w185${profile_path}`,
          }}
          alt="profile"
        />
      </View>
      <Text className="mt-1 text-xs text-center text-white">{character}</Text>
      <Text className="mt-1 text-xs text-center text-neutral-400">{name}</Text>
    </TouchableOpacity>
  )
}
