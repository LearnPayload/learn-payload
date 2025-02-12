import { headers as getHeaders } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export const getUser = async () => {
  const headers = await getHeaders()
  const payload = await getPayload({ config: configPromise })
  return await payload.auth({ headers })
}
