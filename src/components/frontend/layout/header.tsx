'use client'
import Link from 'next/link'
import { Logo } from '../logo'

export const Header = () => {
  return (
    <header className="flex">
      <div className="container mx-auto flex justify-between items-center py-4">
        <Link href="/" className="logo font-extrabold">
          <Logo />
        </Link>
      </div>
    </header>
  )
}
