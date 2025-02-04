import React, { PropsWithChildren } from 'react'
import { SettingsProvider } from '@/components/frontend/providers/settings-provider'
import { GeneralSetting } from '@/payload-types'
import { getCachedGeneralSettings } from '@/globals/general-settings/queries'
export default async function Providers({ children }: PropsWithChildren) {
  const settings: GeneralSetting = await getCachedGeneralSettings()
  return <SettingsProvider settings={settings}>{children}</SettingsProvider>
}
