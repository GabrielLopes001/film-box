/* eslint-disable camelcase */
import { ReactNode } from 'react'
import {
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native'

type MovieCardRootProps = TouchableOpacityProps & {
  children: ReactNode
}

type MovieCardImageProps = {
  children: ReactNode
}

type MovieCardTextProps = TextProps & {
  children: ReactNode
}

function MovieCardRoot({ children, ...rest }: MovieCardRootProps) {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>
}

function MovieCardImage({ children }: MovieCardImageProps) {
  return children
}

function MovieCardText({ children, ...rest }: MovieCardTextProps) {
  return <Text {...rest}>{children}</Text>
}

export { MovieCardRoot, MovieCardImage, MovieCardText }
