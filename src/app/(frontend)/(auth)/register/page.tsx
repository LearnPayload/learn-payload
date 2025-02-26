import InputError from "@/components/frontend/input-error"
import TextLink from "@/components/frontend/text-link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import CardLayout from "../components/card-layout"

export default function Register() {
  return (
    <CardLayout
      title="Create an account"
      description="Enter your details below to create your account"
    >
      <form className="flex flex-col gap-6">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              required
              autoFocus
              tabIndex={1}
              autoComplete="name"
              placeholder="Full name"
            />
            <InputError message={"asdasd"} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              type="email"
              required
              tabIndex={2}
              autoComplete="email"
              placeholder="email@example.com"
            />
            <InputError message={"asdasd"} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              tabIndex={3}
              autoComplete="new-password"
              placeholder="Password"
            />
            <InputError message={"asdasd"} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm password</Label>
            <Input
              id="password_confirmation"
              type="password"
              required
              tabIndex={4}
              autoComplete="new-password"
              placeholder="Confirm password"
            />
            <InputError message={"asdasd"} />
          </div>

          <Button type="submit" className="mt-2 w-full" tabIndex={5}>
            Create account
          </Button>
        </div>

        <div className="text-muted-foreground text-center text-sm">
          Already have an account?{" "}
          <TextLink href={"/login"} tabIndex={6}>
            Log in
          </TextLink>
        </div>
      </form>
    </CardLayout>
  )
}
