import { Image, ImageProps, View } from 'react-native'

export function Avatar({ ...rest }: ImageProps) {
  return (
    <View className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full">
      <Image className="aspect-square h-full w-full" alt="profile" {...rest} />
    </View>
  )
}
