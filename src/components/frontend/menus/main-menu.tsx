'use client'

import Link from 'next/link'
import { useMenu } from '../providers/navigation-provider'
import { Button } from '@/components/ui/button'

export const MainMenu = () => {
  const menu = useMenu('main')

  return (
    <nav className="flex items-center gap-4">
      {menu.menuItems?.map((menuItem) => {
        return (
          <Link key={menuItem.id} href={menuItem.URL}>
            {menuItem.label}
          </Link>
        )
      })}

      <Button>Get Started</Button>
    </nav>
  )
}
