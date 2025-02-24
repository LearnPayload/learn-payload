import { getPayload } from "payload"
import configPromise from "@payload-config"
import { User } from "@/payload-types"
import { createId } from "@paralleldrive/cuid2"
import { randomBytes } from "node:crypto"
import { send } from "@/emails/login-link-email"

export type UserProps = {
  email: string
  password?: string
  name?: string
}

export const sendLoginLink = async (user: User) => {
  const payload = await getPayload({ config: configPromise })
  const token = randomBytes(32).toString("hex")
  await payload.update({
    collection: "users",
    id: user.id,
    data: {
      login_token: token,
      login_token_expiration: new Date(
        Date.now() + 15 * 60 * 1000, // 15 mins in the future
      ).toISOString(),
    },
  })

  const url = new URL(`/api/auth/login/${token}`, process.env.APP_BASE_URL)

  await send({ email: user.email, url })
}

export const getUserByEmail = async (data: UserProps): Promise<User> => {
  const payload = await getPayload({ config: configPromise })

  const email = data.email
  const result = await payload.find({
    collection: "users", // required
    depth: 1,
    page: 1,
    limit: 1,
    pagination: false, // If you want to disable pagination count, etc.
    where: {
      email: {
        equals: email,
      },
    },
  })
  const user =
    result.totalDocs === 0 ? await createUser(data) : result.docs.at(0)!

  return user
}

export const createUser = async (props: UserProps) => {
  const payload = await getPayload({ config: configPromise })
  const password = createId()

  const user = await payload.create({
    collection: "users",
    data: {
      name: props.name ?? "Guest",
      email: props.email,
      password: props.password ?? password,
    },
  })

  return user
}
