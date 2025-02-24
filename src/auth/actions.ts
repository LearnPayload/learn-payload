"use server"
import { redirect } from "next/navigation"
import { getUserByEmail, sendLoginLink } from "@/data-access/users"

import { z } from "zod"

const LoginLinkSchema = z.object({ email: z.string().email() })

type LoginLinkState = {
  success?: boolean
  errors?: {
    email?: string
  }
}

export const createLoginLink = async (
  previousState: LoginLinkState,
  formData: FormData,
): Promise<LoginLinkState> => {
  const email = formData.get("email") as string

  const validatedFields = LoginLinkSchema.safeParse({
    email,
  })

  if (!validatedFields.success) {
    return {
      success: false,
      errors: {
        email: "Please enter a valid email address.",
      },
    }
  }
  try {
    const user = await getUserByEmail({ email }) // creates a user if not exists
    await sendLoginLink(user)
  } catch (error) {
    console.error(error)
    return {
      success: false,
      errors: { email: "There was a problem sending the login link." },
    }
  }

  return { success: true }
}

export const githubAuthorize = async () => {
  redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&scope=read:user`,
  )
}
