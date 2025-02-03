import { getGeneralSettings } from '@/globals/general-settings/queries'
import { SettingsProvider } from './general-settings-provider'

export const Providers = async ({ children }: { children: React.ReactNode }) => {
  const settings = await getGeneralSettings()
  return <SettingsProvider settings={settings}>{children}</SettingsProvider>
}
