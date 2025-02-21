import React, { PropsWithChildren } from "react"
import { SettingsProvider } from "@/components/frontend/providers/settings-provider"
import { getCachedGeneralSettings } from "@/config/globals/general-settings/queries"
import { NavigationProvider } from "@/components/frontend/providers/navigation-provider"
import { getCachedNavigation } from "@/config/globals/navigation/queries"
import { getAuth } from "@/auth/get-auth"
import { AuthProvider } from "./auth-provider"

export default async function Providers({ children }: PropsWithChildren) {
  const settings = await getCachedGeneralSettings()
  const navigation = await getCachedNavigation()
  const { user } = await getAuth()

  return (
    <AuthProvider user={user}>
      <SettingsProvider settings={settings}>
        <NavigationProvider navigation={navigation}>
          {children}
        </NavigationProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}
