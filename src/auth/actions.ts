"use server"
import { Where, getPayload } from "payload"
import configPromise from "@payload-config"

import { redirect } from "next/navigation"
import { PayloadAuth } from "./payload-auth"
import { getUserByEmail } from "@/data-access/users"
import invariant from "tiny-invariant"
export const sendLoginLink = async (formData: FormData) => {
  const email = formData.get("email")
  invariant(typeof email === "string")

  const user = await getUserByEmail({ email })

  await PayloadAuth.login({ user, collection: "users" })
  redirect("/")
}

export const loginAs = async (formData: FormData) => {
  const email = formData.get("email")
  const payload = await getPayload({ config: configPromise })
  const sanitizedEmail =
    typeof email === "string" ? email.toLowerCase().trim() : null

  if (!sanitizedEmail) throw new Error("Wrong email")

  const emailConstraint: Where = {
    email: {
      equals: sanitizedEmail,
    },
  }
  const result = await payload.find({
    collection: "users",
    where: emailConstraint,
    limit: 1,
    pagination: false,
  })

  const user = result.docs.at(0)

  if (!user) {
    throw new Error("Invalid user")
  }

  PayloadAuth.login({
    user,
    collection: "users",
  })

  redirect("/")
}

export const githubAuthorize = async () => {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`,
  )
}
