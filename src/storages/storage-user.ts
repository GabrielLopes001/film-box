import AsyncStorage from '@react-native-async-storage/async-storage'

import { USER_STORAGE } from './storage-config'

export async function storageUserSave(user: string) {
  AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user))
}

export async function storageUserGet() {
  const storageUser = await AsyncStorage.getItem(USER_STORAGE)

  const user = storageUser ? JSON.parse(storageUser) : null

  return user
}

export async function storageUserRemove() {
  AsyncStorage.removeItem(USER_STORAGE)
}
