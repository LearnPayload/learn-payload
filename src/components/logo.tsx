'use client'
import Image from 'next/image'

import { useSettings } from './frontend/providers/general-settings-provider'

export const Logo = () => {
  const settings = useSettings()

  if (typeof settings.logo === 'number' || !settings.logo.url) {
    throw new Error('Expected a media object, but got a number')
  }

  return <Image src={settings.logo.url} alt="Logo" width={116} height={38} />
}
