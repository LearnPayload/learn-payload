'use client'

import Link from 'next/link'
import { useNavigation } from '../providers/navigation-provider'

export const MainMenu = () => {
  const navigation = useNavigation()

  const menus = navigation.menus!

  const mainMenu = menus.find((menu) => menu.name === 'Main')!

  console.log({ menus })

  return (
    <nav className="flex items-center gap-6">
      {mainMenu.menuItems?.map((item) => {
        return (
          <Link key={item.id} href={item.url}>
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
