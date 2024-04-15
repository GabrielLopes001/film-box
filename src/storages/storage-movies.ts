import AsyncStorage from '@react-native-async-storage/async-storage'

import { MOVIE_STORAGE } from './storage-config'

export async function storageFavoriteMoviesSave(movie: number[]) {
  AsyncStorage.setItem(MOVIE_STORAGE, JSON.stringify(movie))
}

export async function storageFavoritesMoviesGet() {
  const storageMovies = await AsyncStorage.getItem(MOVIE_STORAGE)

  const movies: number[] = storageMovies
    ? JSON.parse(storageMovies)
    : ([] as number[])

  return movies
}

export async function storageFavoriteMoviesRemove() {
  AsyncStorage.removeItem(MOVIE_STORAGE)
}
