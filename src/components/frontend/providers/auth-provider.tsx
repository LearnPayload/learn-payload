"use client"

import { User } from "@/payload-types"
import { createContext, PropsWithChildren, useContext, useState } from "react"

type AuthContextType = {
  user: User | null
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  logout: async () => {},
})

interface AuthProviderProps extends PropsWithChildren {
  user: User | null
}

export type Logout = () => Promise<void>

export const AuthProvider = ({
  children,
  user: serverUser,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(serverUser)
  const logout = async () => {
    await fetch(`/api/users/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    })

    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ logout, user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider")
  }

  return context
}
