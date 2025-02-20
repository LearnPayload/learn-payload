"use client"

import { useAuth } from "../providers/auth-provider"

export const Welcome = () => {
  const user = useAuth()
  console.log({ user })
  return (
    <div className="container mx-auto py-24">
      <h1>Welcome </h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  )
}
