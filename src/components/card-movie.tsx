/* eslint-disable camelcase */
import { ReactNode } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type MovieCardRootProps = TouchableOpacityProps & {
  children: ReactNode
}

type MovieCardImageProps = {
  children: ReactNode
}

function MovieCardRoot({ children, ...rest }: MovieCardRootProps) {
  return <TouchableOpacity {...rest}>{children}</TouchableOpacity>
}

function MovieCardImage({ children }: MovieCardImageProps) {
  return children
}

export { MovieCardRoot, MovieCardImage }
