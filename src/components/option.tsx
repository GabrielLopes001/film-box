import { ReactNode } from 'react'
import { Text, TextProps, View } from 'react-native'

type OptionRootProps = {
  children: ReactNode
}

type OptionIconProps = {
  children: ReactNode
}

function OptionRoot({ children }: OptionRootProps) {
  return (
    <View className="w-full flex-row items-center gap-2 border-b border-gray-500 py-3">
      {children}
    </View>
  )
}

function OptionIcon({ children }: OptionIconProps) {
  return <>{children}</>
}

function OptionText(props: TextProps) {
  return <Text className="text-white text-lg flex-1" {...props} />
}

export { OptionRoot, OptionIcon, OptionText }
