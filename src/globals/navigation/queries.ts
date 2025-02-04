import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Config, Navigation } from '@/payload-types'
type Global = keyof Config['globals']

const slug: Global = 'navigation'

export const CACHE_TAG = `global2_${slug}`

async function getNavigation() {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth: 1,
  })

  return global
}

export const getCachedNavigation = unstable_cache(
  async () => getNavigation() as Promise<Navigation>,
  [`${slug}1`],
  {
    tags: [CACHE_TAG],
  },
)
