import DeleteUser from "@/components/frontend/delete-user"
import HeadingSmall from "@/components/frontend/heading-small"
import InputError from "@/components/frontend/input-error"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function Page() {
  return (
    <div className="container mx-auto py-24">
      <div className="space-y-6">
        <HeadingSmall
          title="Profile information"
          description="Update your name and email address"
        />

        <form className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>

            <Input
              id="name"
              className="mt-1 block w-full"
              required
              autoComplete="name"
              placeholder="Full name"
            />

            <InputError className="mt-2" message={"asdasd"} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>

            <Input
              id="email"
              type="email"
              className="mt-1 block w-full"
              required
              autoComplete="username"
              placeholder="Email address"
            />

            <InputError className="mt-2" message={"asdasd"} />
          </div>

          <div>
            <p className="-mt-4 text-sm text-muted-foreground">
              Your email address is unverified.{" "}
              <Link
                href={"/"}
                as="button"
                className="hover:decoration-current! text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out dark:decoration-neutral-500"
              >
                Click here to resend the verification email.
              </Link>
            </p>

            <div className="mt-2 text-sm font-medium text-green-600">
              A new verification link has been sent to your email address.
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button>Save</Button>
          </div>
        </form>
      </div>

      <DeleteUser />
    </div>
  )
}
