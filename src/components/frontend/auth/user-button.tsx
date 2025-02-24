"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOutIcon, User2Icon } from "lucide-react"
import { useAuth } from "../providers/auth-provider"

export function UserButton() {
  const auth = useAuth()
  if (!auth?.user) return null
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-8 h-8 bg-zinc-800">
          <AvatarImage src="https://github.cdddom/shadcn.png" />
          <AvatarFallback className="text-sm bg-zinc-800">
            <User2Icon size={16} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center justify-center"
          onClick={() => auth.logout()}
        >
          <LogOutIcon size={16} />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
