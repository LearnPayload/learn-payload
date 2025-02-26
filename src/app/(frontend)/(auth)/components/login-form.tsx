"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createLoginLink } from "@/auth/actions"
import { useActionState } from "react"
import InputError from "@/components/frontend/input-error"
import { LoaderCircle } from "lucide-react"

export function LoginForm() {
  const [response, action, pending] = useActionState(createLoginLink, {})

  return (
    <form action={action} className="flex-1 flex flex-col gap-6 w-full">
      <div className="grid gap-3">
        <div className="grid gap-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            name="email"
            required
            autoFocus
            tabIndex={1}
            autoComplete="email"
            defaultValue={"hello@example.com"}
            placeholder="email@example.com"
          />
          <InputError message={response.errors?.email} />
        </div>

        <Button
          type="submit"
          className="mt-4 w-full"
          tabIndex={4}
          size={"lg"}
          disabled={pending}
        >
          {pending && <LoaderCircle className="h-4 w-4 animate-spin" />}
          Send me a login link
        </Button>
      </div>

      {/* <div className="text-muted-foreground text-center text-sm">
        Don&apos;t have an account?{" "}
        <TextLink href={"/register"} tabIndex={5}>
          Sign up
        </TextLink>
      </div> */}

      {response.success && (
        <div className="mb-4 text-center text-sm font-medium text-green-600">
          Login link has been sent to your email address
        </div>
      )}
    </form>
  )
}
