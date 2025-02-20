import { Endpoint, PayloadRequest } from "payload"

// endpoints/githubAuth.ts
export const githubAuthCallbackEndpoint: Endpoint = {
  path: "/auth/github/callback",
  method: "get",
  handler: async (req: PayloadRequest) => {
    const code = req.query.code
    console.log({ code })

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

    console.log({ tokenRes })

    if (!tokenRes.ok) {
      return Response.json({}, { status: 401 })
    }

    const body = await tokenRes.json()

    const { access_token } = body

    if (!access_token) {
      return Response.json({ message: "Code invalid" }, { status: 401 })
    }

    const userRes = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })

    const githubUser = await userRes.json()

    const result = req.payload.find({
      collection: "users",
      where: {
        email: {
          equals: githubUser.id.toString(),
        },
      },
    })
    return Response.json({})
  },
}
