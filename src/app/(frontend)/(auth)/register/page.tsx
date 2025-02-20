import { PromotionSection } from "../components/promotion-section"
import { RegisterForm } from "../components/register-form"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
        <RegisterForm />
      </div>
      <PromotionSection />
    </div>
  )
}
