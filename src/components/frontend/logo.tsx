'use client'
import Image from 'next/image'
import { useSettings } from './providers/settings-provider'

export const Logo = () => {
  const settings = useSettings()

  console.log({ settings })

  if (!settings || typeof settings.logo === 'number' || !settings.logo) {
    return null
  }

  return <Image src={settings.logo.url!} alt="Logo" width={587} height={253} className="w-40" />
}
