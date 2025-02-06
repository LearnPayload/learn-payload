'use client'
import Image from 'next/image'
import { useSettings } from './providers/settings-provider'

export const Logo = () => {
  const settings = useSettings()

  if (!settings || typeof settings.logo === 'number') {
    throw new Error('Logo not found')
  }

  return <Image src={settings.logo.url!} alt="Logo" width={587} height={253} className="w-40" />
}
