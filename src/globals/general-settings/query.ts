import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Config, GeneralSetting } from '@/payload-types'
type Global = keyof Config['globals']

const slug: Global = 'generalSettings'

export const CACHE_TAG = `global_${slug}`

async function getGeneralSettings() {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth: 1,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGeneralSettings = unstable_cache(
  async () => getGeneralSettings() as Promise<GeneralSetting>,
  [slug],
  {
    tags: [CACHE_TAG],
  },
)
