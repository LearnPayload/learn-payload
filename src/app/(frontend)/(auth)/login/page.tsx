import CardLayout from "../components/card-layout"
import { LoginForm } from "../components/login-form"

export default function LoginPage() {
  return (
    <CardLayout title="Login" description="Enter your details below to login">
      <LoginForm />
    </CardLayout>
  )
}
