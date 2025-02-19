'use server'
import sanitizeInternalFields from '@/lib/sanitize-internal-fields'
import { Where, getCookieExpiration, getFieldsToSign, getPayload } from 'payload'
import configPromise from '@payload-config'
import { jwtSign } from '@/lib/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export const loginAs = async (formData: FormData) => {
  const cookieStore = await cookies()
  const email = formData.get('email')
  const payload = await getPayload({ config: configPromise })
  const sanitizedEmail = typeof email === 'string' ? email.toLowerCase().trim() : null

  if (!sanitizedEmail) throw new Error('Wrong email')

  const emailConstraint: Where = {
    email: {
      equals: sanitizedEmail,
    },
  }

  let user = await payload.db.findOne<any>({
    collection: 'users',
    where: emailConstraint,
  })

  user.collection = 'users'

  user = sanitizeInternalFields(user)

  const collectionConfig = payload.collections.users.config
  const secret = payload.secret
  const fieldsToSign = getFieldsToSign({
    collectionConfig,
    email: sanitizedEmail,
    user,
  })

  const { token } = await jwtSign({
    fieldsToSign,
    secret,
    tokenExpiration: collectionConfig.auth.tokenExpiration,
  })
  const expires = getCookieExpiration({ seconds: collectionConfig.auth.tokenExpiration })
  cookieStore.set('payload-token', token, { expires, httpOnly: true })

  redirect('/')
}
