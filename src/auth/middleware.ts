// import { decodeJwt } from 'jose'

import { RequestCookies } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest, NextResponse } from 'next/server'

// const parseUserFromCookie = async (cookies: RequestCookies) => {
//   const token = cookies.get('payload-token')?.value
//   if (!token) return null

//   const user = decodeJwt(token)
//   if (!user) return null

//   return user
// }

const parseUserFromEndpoint = async (cookies: RequestCookies) => {
  const token = cookies.get('payload-token')?.value
  if (!token) return null

  const resp = await fetch(`${process.env.APP_BASE_URL}/api/users/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const user = await resp.json()
  if (!user) return null

  return user
}

export const withAuth = async (request: NextRequest) => {
  const response = NextResponse.next()
  const user = await parseUserFromEndpoint(request.cookies)
  if (request.nextUrl.pathname.startsWith('/account') && !user) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return response
}
