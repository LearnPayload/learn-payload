import { Config } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

type Global = keyof Config['globals']

const slug: Global = 'generalSettings'

export const getGeneralSettings = async () => {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth: 1,
  })

  return global
}
