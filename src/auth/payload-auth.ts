import { jwtSign } from "@/lib/jwt"
import {
  CollectionSlug,
  getCookieExpiration,
  getFieldsToSign,
  getPayload,
} from "payload"
import configPromise from "@payload-config"

import { cookies } from "next/headers"
import { User } from "@/payload-types"

export class PayloadAuth {
  static async login({
    user,
    collection,
  }: {
    user: User
    collection: CollectionSlug
  }) {
    const cookieStore = await cookies()
    const payload = await getPayload({ config: configPromise })

    const collectionConfig = payload.collections[collection].config

    if (!collectionConfig.auth) {
      throw new Error("Collection is not used for authentication")
    }

    const secret = payload.secret
    const fieldsToSign = getFieldsToSign({
      collectionConfig,
      email: user.email,
      user: null,
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
}
