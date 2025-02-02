import type { Navigation } from '@/payload-types'
import { getCachedGlobalConfig } from './get-global-config'

export const getMenu = async (menuSlug: string) => {
  const { menus } = await getCachedGlobalConfig<Navigation>('navigation')()
  const menu = menus.find((menu) => menu.menuSlug === menuSlug)

  if (!menu) {
    throw new Error(`Menu with slug ${menuSlug} not found`)
  }
  return menu
}
