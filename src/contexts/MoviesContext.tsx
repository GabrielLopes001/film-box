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

type MoviesContextData = {
  favoritesMovies: number[]
  allFavoritesMovies: CardMovieListProps[]
  addFavoriteMovie: (movieId: number) => void
  removeFavoriteMovie: (movieId: number) => void
}

export const MovieContext = createContext<MoviesContextData>({
  favoritesMovies: [],
  allFavoritesMovies: [],
  addFavoriteMovie: () => {},
  removeFavoriteMovie: () => {},
})

type MovieProvideProps = {
  children: ReactNode
}

export function MovieProvider({ children }: MovieProvideProps) {
  const [favoritesMovies, setFavoritesMovies] = useState<number[]>([])
  const [allFavoritesMovies, setAllFavoritesMovies] = useState<
    CardMovieListProps[]
  >([] as CardMovieListProps[])

  useEffect(() => {
    loadFavoriteMovies()
  }, [])

  const addFavoriteMovie = useCallback(
    async (movieId: number) => {
      if (!favoritesMovies.includes(movieId)) {
        const newFavoriteMovies = [...favoritesMovies, movieId]
        setFavoritesMovies(newFavoriteMovies)
        await storageFavoriteMoviesSave(newFavoriteMovies)
      }
    },
    [favoritesMovies],
  )

  const removeFavoriteMovie = useCallback(
    async (movieId: number) => {
      const newFavoriteMovies = favoritesMovies.filter((id) => id !== movieId)
      setFavoritesMovies(newFavoriteMovies)
      await storageFavoriteMoviesSave(newFavoriteMovies)
    },
    [favoritesMovies],
  )

  async function loadFavoriteMovies() {
    const movies = await storageFavoritesMoviesGet()
    if (movies) {
      setFavoritesMovies(movies)
      console.log(favoritesMovies)
    }
  }

  const parsedFavoriteMovies = useMemo(() => favoritesMovies, [favoritesMovies])

  const getAllFavoriteMovies = useCallback(async () => {
    try {
      const movies = await Promise.all(
        parsedFavoriteMovies.map(async (movieId: number) => {
          const response = await api.get<CardMovieListProps>(
            `/movie/${movieId}`,
          )
          return response.data
        }),
      )
      setAllFavoritesMovies(movies)
    } catch (error) {
      console.log(error)
    }
  }, [parsedFavoriteMovies])

  useEffect(() => {
    getAllFavoriteMovies()
  }, [parsedFavoriteMovies, getAllFavoriteMovies])

  return (
    <MovieContext.Provider
      value={{
        favoritesMovies: parsedFavoriteMovies,
        allFavoritesMovies,
        addFavoriteMovie,
        removeFavoriteMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
