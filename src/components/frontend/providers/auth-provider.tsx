'use client'

import { User } from '@/payload-types'
import { createContext, PropsWithChildren, useContext } from 'react'

const AuthContext = createContext<User | null>(null)

interface AuthProviderProps extends PropsWithChildren {
  user: User | null
}

export const AuthProvider = ({ children, user }: AuthProviderProps) => {
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return context
}
