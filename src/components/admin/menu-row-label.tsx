"use client"

import { useRowLabel } from "@payloadcms/ui"

export const MenuRowLabel = () => {
  const { data } = useRowLabel<{ menuName?: string }>()

  const customLabel = `${data.menuName} Menu`

  return <div>{customLabel}</div>
}
