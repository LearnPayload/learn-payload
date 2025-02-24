import { cookies, headers as getHeaders } from "next/headers"
import { getCookieExpiration, getFieldsToSign, getPayload } from "payload"
import configPromise from "@payload-config"
import { User } from "@/payload-types"
import { jwtSign } from "@/lib/jwt"

export type UserWithCollection = User & { collection: "users" }

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

export const loginWith = async (user: User) => {
  const cookieStore = await cookies()
  const payload = await getPayload({ config: configPromise })
  const userWithCollection: UserWithCollection = {
    ...user,
    collection: "users",
  }

  const collectionConfig =
    payload.collections[userWithCollection.collection].config

  if (!collectionConfig.auth) {
    throw new Error("Collection is not used for authentication")
  }

  const secret = payload.secret
  const fieldsToSign = getFieldsToSign({
    collectionConfig,
    email: userWithCollection.email,
    user: userWithCollection,
  })

  const { token } = await jwtSign({
    fieldsToSign,
    secret,
    tokenExpiration: collectionConfig.auth.tokenExpiration,
  })

  const name = `${payload.config.cookiePrefix}-token`
  const expires = getCookieExpiration({
    seconds: collectionConfig.auth.tokenExpiration,
  })
  cookieStore.set({
    name,
    value: token,
    expires,
    httpOnly: true,
    domain: collectionConfig.auth.cookies.domain ?? undefined,
    secure: collectionConfig.auth.cookies.secure,
  })
}
