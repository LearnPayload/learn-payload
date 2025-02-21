import { getUserByEmail as findUserOrCreate } from "@/data-access/users"
import { Endpoint, PayloadRequest } from "payload"
import { PayloadAuth } from "../payload-auth"
import { createId } from "@paralleldrive/cuid2"

// endpoints/githubAuth.ts
export const githubAuthCallbackEndpoint: Endpoint = {
  path: "/auth/github/callback",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const code = req.query.code

    const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    })

    if (!tokenRes.ok) {
      return Response.redirect(new URL(`/login?error=github_email`, process.env.APP_BASE_URL))
    }

    const body = await tokenRes.json()

    const { access_token } = body

    if (!access_token) {
      return Response.redirect(new URL(`/login?error=github_email`, process.env.APP_BASE_URL))
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const githubUser = await userRes.json()

    if (!githubUser || !githubUser.email) {
      return Response.redirect(new URL(`/login?error=github_email`, process.env.APP_BASE_URL))
    }
    const password = createId()
    const user = await findUserOrCreate({
      email: githubUser.email,
      password,
      name: githubUser.name,
    })

    // update password
    await req.payload.update({
      collection: "users",
      id: user.id,
      data: { password },
    })

    try {
      await PayloadAuth.login({ user, collection: "users" })
    } catch (error) {
      return Response.redirect(new URL(`/login?error=github_email`, process.env.APP_BASE_URL))
    }

    return Response.redirect(new URL(`/`, process.env.APP_BASE_URL))
  },
}
