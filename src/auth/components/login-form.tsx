'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Github } from 'lucide-react'
import Link from 'next/link'
import { ChangeEvent, ChangeEventHandler, useState } from 'react'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const handleFetch = async () => {
      try {
        const response = await fetch(`/api/users/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })

        if (!response.ok) {
          throw new Error('Login failed')
        }

        // Redirect or handle successful login
        window.location.reload()
      } catch (error) {
        console.error('Login error:', error)
        // Handle login error
      }
    }

    handleFetch()
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setPassword(e.target.value)
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Enter your credentials to access your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={email}
              onChange={handleEmailChange}
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              value={password}
              onChange={handlePasswordChange}
              type="password"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            Sign In
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
          onClick={() => console.log('GitHub auth')}
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full flex items-center gap-2">
          <span>Don't have an account?</span>
          <Link href="/register" className="p-0">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
