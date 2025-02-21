import { getUserByEmail } from "@/data-access/users"
import { Endpoint, PayloadRequest } from "payload"
import { loginWith } from "@/auth"

// endpoints/githubAuth.ts
export const githubAuthCallbackEndpoint: Endpoint = {
  path: "/auth/github/callback",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const code = req.query.code

    const tokenRes = await fetch(
      "https://github.com/login/oauth/access_token",
      {
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
      },
    )

    if (!tokenRes.ok) {
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }

    const body = await tokenRes.json()

    const { access_token } = body

    if (!access_token) {
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const githubUser = await userRes.json()

    if (!githubUser || !githubUser.email) {
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }
    const user = await getUserByEmail({
      email: githubUser.email,
      name: githubUser.name,
    })

    try {
      await loginWith({ user, collection: "users" })
    } catch (error) {
      console.error(error)
      return Response.redirect(
        new URL(`/login?error=github_email`, process.env.APP_BASE_URL),
      )
    }

    return Response.redirect(new URL(`/`, process.env.APP_BASE_URL))
  },
}

export const loginTokenVerifyEndpoint: Endpoint = {
  path: "/auth/login/:token",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const token = req.routeParams?.token

    if (!token) {
      return Response.redirect(
        new URL(`/login?token_error=true`, process.env.APP_BASE_URL),
      )
    }

    const result = await req.payload.find({
      collection: "users",
      where: {
        login_token: {
          equals: token,
        },
      },
    })

    if (result.totalDocs === 0) {
      return Response.redirect(
        new URL(`/login?token_error=true`, process.env.APP_BASE_URL),
      )
    }

    const user = result.docs.at(0)!
    const expires = new Date(user.login_token_expiration ?? "")
    const now = new Date()

    console.log({ expires, now })

    await req.payload.update({
      collection: "users",
      id: user.id,
      data: {
        login_token: null,
        login_token_expiration: null,
      },
    })

    if (expires < now) {
      return Response.redirect(
        new URL(`/login?token_error=true`, process.env.APP_BASE_URL),
      )
    }

    await loginWith({ user, collection: "users" })

    return Response.redirect(new URL(`/`, process.env.APP_BASE_URL))
  },
}
