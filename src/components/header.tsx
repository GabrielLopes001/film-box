import {
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'
import {
  Bars3BottomLeftIcon,
  MagnifyingGlassIcon,
} from 'react-native-heroicons/outline'

export function Header(props: TouchableOpacityProps) {
  return (
    <View className="mx-4 flex-row items-center justify-between">
      <Bars3BottomLeftIcon size="30" strokeWidth={2} color="white" />
      <Text className="text-3xl font-bold text-white">Movie</Text>
      <TouchableOpacity {...props}>
        <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
      </TouchableOpacity>
    </View>
  )
}
