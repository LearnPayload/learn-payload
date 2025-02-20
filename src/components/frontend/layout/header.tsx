import Link from "next/link"
import { Logo } from "../logo"
import { MainMenu } from "../menus/main-menu"

export const Header = () => {
  return (
    <header className="flex">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="logo font-extrabold">
          <Logo />
        </Link>
        <MainMenu />
      </div>
    </header>
  )
}
