import { getMenu } from '@/utils/get-menu'
import Link from 'next/link'

export const Header = async () => {
  const menu = await getMenu('main')
  return (
    <header className="flex">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="logo font-extrabold">
          Learn <span className="text-[#3D9D9F]">Payload</span> with Colyn
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
