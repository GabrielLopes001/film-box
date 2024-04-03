import { Dimensions, View } from 'react-native'
import * as Progress from 'react-native-progress'

const { height, width } = Dimensions.get('window')

export function Loading() {
  return (
    <View
      style={{ height, width }}
      className="justify-center items-center absolute flex-row"
    >
      <Progress.CircleSnail thickness={12} size={180} color="#1d4ed8" />
    </View>
  )
}
