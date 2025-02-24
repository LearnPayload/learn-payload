"use client"

import Link from "next/link"
import { useMenu } from "../providers/navigation-provider"
import { buttonVariants } from "@/components/ui/button"
import { useAuth } from "../providers/auth-provider"
import { User } from "lucide-react"
import { UserButton } from "../auth/user-button"

const buttonStyles = buttonVariants

export const MainMenu = () => {
  const menu = useMenu("main")
  const { user } = useAuth()

  return (
    <nav className="flex items-center gap-4">
      {menu.menuItems?.map((menuItem) => {
        return (
          <Link key={menuItem.id} href={menuItem.URL}>
            {menuItem.label}
          </Link>
        )
      })}

      {user ? (
        <UserButton />
      ) : (
        <Link href="/login" className={buttonStyles({ variant: "outline" })}>
          <User size={16} />
          Login
        </Link>
      )}
    </nav>
  )
}
