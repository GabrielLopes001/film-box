import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

import { Avatar } from '@/components/avatar'

type UserProps = TouchableOpacityProps & {
  user: string
}

export function User({ user, ...rest }: UserProps) {
  return (
    <View className="items-center">
      <Avatar source={{ uri: user }} />
      <TouchableOpacity className="w-full h-14" {...rest}>
        <Text className="text-orange-500 font-bold text-base mt-4 ">
          Alterar foto
        </Text>
      </TouchableOpacity>
      <Text className="text-white font-bold text-2xl ">Gabriel Lopes</Text>
      <Text className="text-gray-400 text-lg">@gb_lopesz</Text>
    </View>
  )
}
