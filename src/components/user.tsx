import { Text, View } from 'react-native'

import { Avatar } from '@/components/avatar'

export function User() {
  return (
    <View className="items-center">
      <Avatar />
      <Text className="text-white font-bold text-2xl mt-4">Gabriel Lopes</Text>
      <Text className="text-gray-400 text-lg">@gb_lopesz</Text>
    </View>
  )
}
