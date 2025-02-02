import { unstable_cache } from 'next/cache'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { Config, Navigation } from '@/payload-types'
type Global = keyof Config['globals']

const slug: Global = 'navigation'
export const CACHE_TAG = `global_${slug}`

async function getNavigation() {
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
export const getCachedNavigation = unstable_cache(
  async () => getNavigation() as Promise<Navigation>,
  [slug],
  {
    tags: [CACHE_TAG],
  },
)

export const getMenu = async (menuSlug: string) => {
  const { menus } = await getCachedNavigation()
  const menu = menus.find((menu) => menu.menuSlug === menuSlug)

  if (!menu) {
    throw new Error(`Menu with slug ${menuSlug} not found`)
  }
  return menu
}
