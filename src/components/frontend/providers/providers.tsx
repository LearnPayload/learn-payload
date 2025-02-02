import React, { PropsWithChildren } from 'react'
import { SettingsProvider } from '@/components/frontend/providers/settings-provider'
import { GeneralSetting, Navigation } from '@/payload-types'
import { getCachedGeneralSettings } from '@/globals/general-settings/query'
import { NavigationProvider } from '@/components/frontend/providers/menu-provider'
import { getCachedNavigation } from '@/globals/navigation/query'

export default async function Providers({ children }: PropsWithChildren) {
  const settings: GeneralSetting = await getCachedGeneralSettings()()
  const navigation: Navigation = await getCachedNavigation()()

  return (
    <SettingsProvider settings={settings}>
      <NavigationProvider navigation={navigation}>{children}</NavigationProvider>
    </SettingsProvider>
  )
}
