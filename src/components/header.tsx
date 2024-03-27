import { ReactNode } from 'react'
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
} from 'react-native'

export type HeaderRootProps = {
  children: ReactNode
}

type HeaderTextProps = {
  children: ReactNode
}

type HeaderIconProps = {
  children: ReactNode
}

type HeaderButtonProps = TouchableOpacityProps & {
  children: ReactNode
}

function HeaderRoot({ children }: HeaderRootProps) {
  return (
    <View className="mx-4 flex-row items-center justify-between mt-16">
      {children}
    </View>
  )
}

function HeaderButton({ children, ...rest }: HeaderButtonProps) {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>
}

function HeaderText({ children }: HeaderTextProps) {
  return <Text className="text-3xl font-bold text-white">{children}</Text>
}

function HeaderTextInput({ ...rest }: TextInputProps) {
  return (
    <TextInput
      className=" pl-6 p-3 text-base font-semibold tracking-wide text-white"
      {...rest}
    />
  )
}

function HeaderIcon({ children }: HeaderIconProps) {
  return children
}

export { HeaderRoot, HeaderText, HeaderIcon, HeaderButton, HeaderTextInput }
