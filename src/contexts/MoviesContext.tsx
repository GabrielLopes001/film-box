import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { CardMovieListProps } from '@/components/card-movie-list'
import { api } from '@/services/api'
import {
  storageFavoriteMoviesSave,
  storageFavoritesMoviesGet,
} from '@/storages/storage-movies'

interface MovieContextData {
  favoriteMovies: number[]
  allFavoriteMovies: CardMovieListProps[]
  addFavoriteMovie: (movieId: number) => Promise<void>
  removeFavoriteMovie: (movieId: number) => Promise<void>
}

export const MovieContext = createContext<MovieContextData>(
  {} as MovieContextData,
)

type MovieProviderProps = {
  children: ReactNode
}

export const MovieProvider = ({ children }: MovieProviderProps) => {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([])
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<
    CardMovieListProps[]
  >([] as CardMovieListProps[])

  useEffect(() => {
    async function loadFavoriteMovies() {
      const favoriteMovies = await storageFavoritesMoviesGet()
      if (favoriteMovies) {
        setFavoriteMovies(favoriteMovies)
      }
    }
    loadFavoriteMovies()
  }, [])

  const addFavoriteMovie = useCallback(
    async (movieId: number) => {
      if (!favoriteMovies.includes(movieId)) {
        const newFavoriteMovies = [...favoriteMovies, movieId]
        setFavoriteMovies(newFavoriteMovies)
        await storageFavoriteMoviesSave(newFavoriteMovies)
      }
    },
    [favoriteMovies],
  )

  const removeFavoriteMovie = useCallback(
    async (movieId: number) => {
      const newFavoriteMovies = favoriteMovies.filter((id) => id !== movieId)
      setFavoriteMovies(newFavoriteMovies)
      await storageFavoriteMoviesSave(newFavoriteMovies)
    },
    [favoriteMovies],
  )

  const parsedFavoriteMovies = useMemo(() => favoriteMovies, [favoriteMovies])

  const getAllFavoriteMovies = useCallback(async () => {
    try {
      const movies = await Promise.all(
        parsedFavoriteMovies.map(async (movieId: number) => {
          const response = await api.get(`/movie/${movieId}`)
          return response.data
        }),
      )
      setAllFavoriteMovies(movies)
    } catch (error) {
      console.log(error)
    }
  }, [parsedFavoriteMovies])

  useEffect(() => {
    getAllFavoriteMovies()
  }, [parsedFavoriteMovies, getAllFavoriteMovies])

  const contextData: MovieContextData = {
    favoriteMovies: parsedFavoriteMovies,
    allFavoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
  }

  return (
    <MovieContext.Provider value={contextData}>
      {children}
    </MovieContext.Provider>
  )
}
