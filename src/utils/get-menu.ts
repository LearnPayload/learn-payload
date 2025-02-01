import type { Navigation } from '@/payload-types'
import { getGlobalConfig } from './get-global-config'

export const getMenu = async (menuSlug: string) => {
  const navgiationData = (await getGlobalConfig('navigation', 1)()) as Navigation // stupid!
  const menu = navgiationData.menus.find((menu) => menu.menuSlug === menuSlug)

  if (!menu) {
    throw new Error(`Menu with slug ${menuSlug} not found`)
  }
  return menu
}
