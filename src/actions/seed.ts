'use server'
import { getPayload, GlobalSlug } from 'payload'
import configPromise from '@payload-config'

export async function seed() {
  const slug: GlobalSlug = 'generalSettings'
  const payload = await getPayload({ config: configPromise })

  await payload.updateGlobal({
    slug,
    data: {
      title: 'Learn Payload with Colyn',
      tagline: 'A batteries included backend for NextJS.',
    },
    depth: 0,
    context: {
      disableRevalidate: true,
    },
  })
}
