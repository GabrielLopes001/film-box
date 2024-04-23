import { Image, View } from 'react-native'

export function Avatar() {
  return (
    <View className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full">
      <Image
        source={{ uri: 'https://github.com/GabrielLopes001.png' }}
        className="aspect-square h-full w-full"
        alt="profile"
      />
    </View>
  )
}
