'use client'
import Link from 'next/link'
import { Logo } from '../logo'
import { useMenu } from '../providers/menu-provider'

export const Header = () => {
  const menu = useMenu('main')
  return (
    <header className="flex">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="logo font-extrabold">
          <Logo />
        </Link>
        <nav className="flex items-center gap-4">
          {menu.menuItems?.map((menuItem) => {
            return (
              <Link key={menuItem.id} href={menuItem.URL}>
                {menuItem.label}
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
