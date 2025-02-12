import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function Page() {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers })

  return (
    <div className="container mx-auto p-16">
      <h1 className="font-bold text-lg">Profile ({user?.email})</h1>
    </div>
  )
}
