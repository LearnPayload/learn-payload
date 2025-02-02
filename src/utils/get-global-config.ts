import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

export function getCachedGlobalConfig<T>(slug: Global) {
  return unstable_cache(
    async () => getGlobalConfig(slug, 0) as Promise<T>,
    [`global_config_${slug}`],
  )
}

// export const getCachedGlobalConfig<T> = (slug: Global) =>
//   unstable_cache(async () => getGlobalConfig(slug, 0), [`global_config_${slug}`])

async function getGlobalConfig(slug: Global, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
  })

  return global
}
