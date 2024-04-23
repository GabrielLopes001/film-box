import { useState } from 'react'
import { Text, View } from 'react-native'
import { MoonIcon } from 'react-native-heroicons/solid'

import { Switch } from '@/components/switch'

import { OptionIcon, OptionRoot, OptionText } from './option'

export function Preferences() {
  const [isEnable, setIsEnable] = useState(false)
  return (
    <View className="w-full">
      <Text className="text-white font-bold text-xl mt-6 mb-6">
        Preferências
      </Text>

      <OptionRoot>
        <OptionIcon>
          <MoonIcon color={'white'} />
        </OptionIcon>
        <OptionText>Dark Mode</OptionText>
        <Switch onValueChange={setIsEnable} value={isEnable} />
      </OptionRoot>
    </View>
  )
}
