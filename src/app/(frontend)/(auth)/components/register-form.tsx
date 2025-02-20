"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Github } from "lucide-react"
import Link from "next/link"

export function RegisterForm() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
            Register
          </Button>
        </form>
        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => console.log("GitHub auth")}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full flex items-center gap-2">
          <span>Already have an account?</span>
          <Link href="/login" className="p-0">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
