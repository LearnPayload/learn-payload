import React, { PropsWithChildren } from 'react'
import { SettingsProvider } from '@/components/frontend/providers/settings-provider'
import { getCachedGeneralSettings } from '@/globals/general-settings/queries'
import { NavigationProvider } from '@/components/frontend/providers/navigation-provider'
import { getCachedNavigation } from '@/globals/navigation/queries'
import { getUser } from '@/auth/get-user'
import { AuthProvider } from './auth-provider'

export default async function Providers({ children }: PropsWithChildren) {
  const settings = await getCachedGeneralSettings()
  const navigation = await getCachedNavigation()
  const user = await getUser()

  return (
    <AuthProvider user={user}>
      <SettingsProvider settings={settings}>
        <NavigationProvider navigation={navigation}>{children}</NavigationProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}
