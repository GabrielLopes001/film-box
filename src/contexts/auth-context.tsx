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
import { storageUserGet, storageUserSave } from '@/storages/storage-user'

interface AuthContextDataProps {
  favoriteMovies: number[]
  allFavoriteMovies: CardMovieListProps[]
  addFavoriteMovie: (movieId: number) => Promise<void>
  removeFavoriteMovie: (movieId: number) => Promise<void>
  user: string
  updateUserProfile: (userUpdated: string) => Promise<void>
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [favoriteMovies, setFavoriteMovies] = useState<number[]>([])
  const [allFavoriteMovies, setAllFavoriteMovies] = useState<
    CardMovieListProps[]
  >([] as CardMovieListProps[])
  const [user, setUser] = useState('')

  async function userUpdate(user: string) {
    setUser(user)
  }

  async function updateUserProfile(userUpdated: string) {
    try {
      setUser(userUpdated)
      await storageUserSave(userUpdated)
    } catch (error) {
      console.log(error)
    }
  }

  async function loadUserData() {
    const user = await storageUserGet()

    if (user) {
      await userUpdate(user)
    }
  }

  async function loadFavoriteMovies() {
    const favoriteMovies = await storageFavoritesMoviesGet()
    if (favoriteMovies) {
      setFavoriteMovies(favoriteMovies)
    }
  }

  useEffect(() => {
    loadFavoriteMovies()
    loadUserData()
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

  const contextData: AuthContextDataProps = {
    favoriteMovies: parsedFavoriteMovies,
    allFavoriteMovies,
    addFavoriteMovie,
    removeFavoriteMovie,
    user,
    updateUserProfile,
  }

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  )
}
