'use client'

import { useRowLabel } from '@payloadcms/ui'

export const MenuItemRowLabel = () => {
  const { data } = useRowLabel<{ label?: string }>()

  const customLabel = `${data.label}`

  return <div>{customLabel}</div>
}
