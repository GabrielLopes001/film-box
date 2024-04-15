import { useContext } from 'react'

import { MovieContext } from '@/contexts/MoviesContext'

export function useMovie() {
  const context = useContext(MovieContext)

  return context
}
