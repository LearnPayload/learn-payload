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

export const useNavigation = (): Navigation => {
  const context = NavigationContext
  if (context === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  const navigation = useContext(context)
  if (navigation === null || navigation === undefined) {
    throw new Error('Please provide navigation to the NavigationProvider')
  }
  if (navigation.menus === null || navigation.menus === undefined) {
    throw new Error('Please provide navigation with at least one menu')
  }
  return navigation
}
