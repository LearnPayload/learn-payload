import { headers as getHeaders } from "next/headers"
import { getPayload } from "payload"
import configPromise from "@payload-config"

export type AuthCredentials = {
  email: string
  password: string
}

export const getAuth = async () => {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  return await payload.auth({ headers })
}

export const login = async (credentials: AuthCredentials) => {
  const payload = await getPayload({ config: configPromise })
  return await payload.login({
    collection: "users",
    data: credentials,
  })
}
