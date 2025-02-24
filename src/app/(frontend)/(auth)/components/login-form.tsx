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
import Link from "next/link"
import { githubAuthorize, createLoginLink } from "@/auth/actions"
import { GithubIcon } from "@/components/icons/github"
import { useActionState } from "react"

export function LoginForm() {
  const [response, action, pending] = useActionState(createLoginLink, {})

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>
          Enter your email address to get your login link!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              defaultValue={"john@example.com"}
              type="text"
              placeholder="john@example.com"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={pending}>
            {pending ? "Please wait..." : "Send me a login link"}
          </Button>

          {response.success && (
            <p className="text-emerald-500 text-sm">
              Login link successfully sent!
            </p>
          )}

          {response.errors && (
            <p className="text-destructive text-sm">{response.errors.email}</p>
          )}
        </form>
        <div className="mt-4 relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={async () => githubAuthorize()}
        >
          <GithubIcon />
          GitHub
        </Button>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center w-full flex items-center gap-2">
          <span>Don&apos;t have an account?</span>
          <Link href="/register" className="p-0">
            Register
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}
