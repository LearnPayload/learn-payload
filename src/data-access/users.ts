import { getPayload } from "payload"
import configPromise from "@payload-config"
import { User } from "@/payload-types"

export type UserProps = {
  email: string
  password?: string
  name?: string
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

  const user = result.totalDocs === 0 ? await createUser(data) : result.docs.at(0)!

  return user
}

export const createUser = async ({ email, password, name = "" }: UserProps) => {
  const payload = await getPayload({ config: configPromise })

  const user = await payload.create({
    collection: "users",
    data: {
      name,
      email,
      password,
    },
  })

  return user
}
