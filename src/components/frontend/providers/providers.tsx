import React, { PropsWithChildren } from 'react'
import { SettingsProvider } from '@/components/frontend/providers/settings-provider'
import { GeneralSetting, Navigation } from '@/payload-types'
import { getCachedGeneralSettings } from '@/globals/general-settings/queries'
import { getCachedNavigation } from '@/globals/navigation/queries'
import { NavigationProvider } from './navigation-provider'
export default async function Providers({ children }: PropsWithChildren) {
  const settings: GeneralSetting = await getCachedGeneralSettings()

  const navigation: Navigation = await getCachedNavigation()
  return (
    <SettingsProvider settings={settings}>
      <NavigationProvider navigation={navigation}>{children}</NavigationProvider>
    </SettingsProvider>
  )
}
