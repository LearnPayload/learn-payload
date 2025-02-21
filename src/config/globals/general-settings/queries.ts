import { unstable_cache } from "next/cache"
import { getPayload } from "payload"
import configPromise from "@payload-config"

const slug = "generalSettings"

export const CACHE_TAG = `global_${slug}`

export async function getGeneralSettings() {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth: 1,
  })

  return global
}

export const getCachedGeneralSettings = unstable_cache(
  async () => getGeneralSettings(),
  [slug],
  {
    tags: [CACHE_TAG],
  },
)
