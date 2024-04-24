import { createContext, ReactNode, useEffect, useState } from 'react'

import { storageUserGet, storageUserSave } from '@/storages/storage-user'

export type UserContextDataProps = {
  user: string
  updateUserProfile: (userUpdated: string) => Promise<void>
}

type UserContextProviderProps = {
  children: ReactNode
}

export const UserContext = createContext<UserContextDataProps>(
  {} as UserContextDataProps,
)

export function UserContextProvider({ children }: UserContextProviderProps) {
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

  useEffect(() => {
    loadUserData()
  }, [])

  return (
    <UserContext.Provider value={{ user, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  )
}
