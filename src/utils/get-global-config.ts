import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

export async function getGlobalConfigBySlug(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getGlobalConfig = (slug: Global, depth = 0) =>
  unstable_cache(async () => getGlobalConfigBySlug(slug, depth), [slug], {
    tags: [`global_${slug}`],
  })
