'use client'

import { createContext, PropsWithChildren, useContext } from 'react'
import { Navigation } from '@/payload-types'

const NavigationContext = createContext<Navigation | null>(null)

interface NavigationProviderProps extends PropsWithChildren {
  navigation: Navigation
}

export const NavigationProvider = ({ children, navigation }: NavigationProviderProps) => {
  return <NavigationContext.Provider value={navigation}>{children}</NavigationContext.Provider>
}

export const useMenu = (slug: string) => {
  const context = NavigationContext
  if (context === undefined) {
    throw new Error('useMenu must be used within a NavigationProvider')
  }
  const navigation = useContext(context)
  if (navigation === null) {
    throw new Error('Please provide navigation to the NavigationProvider')
  }

  const { menus } = navigation
  const menu = menus.find((menu) => menu.slug === slug)

  if (!menu) {
    throw new Error(`Menu with slug ${slug} not found`)
  }
  return menu
}
