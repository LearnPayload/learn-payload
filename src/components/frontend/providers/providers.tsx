import React, { PropsWithChildren } from 'react'
import { SettingsProvider } from '@/components/frontend/providers/settings-provider'
import { getCachedGeneralSettings } from '@/globals/general-settings/queries'
import { NavigationProvider } from '@/components/frontend/providers/navigation-provider'
import { getCachedNavigation } from '@/globals/navigation/queries'

export default async function Providers({ children }: PropsWithChildren) {
  const settings = await getCachedGeneralSettings()
  const navigation = await getCachedNavigation()

  return (
    <SettingsProvider settings={settings}>
      <NavigationProvider navigation={navigation}>{children}</NavigationProvider>
    </SettingsProvider>
  )
}
