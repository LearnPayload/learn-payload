import { CheckCircle } from "lucide-react"

export function PromotionSection() {
  return (
    <div className="bg-[#3D9F95] text-primary-foreground flex-1 p-6 lg:p-12 flex items-center justify-center">
      <div className="max-w-md">
        <h2 className="text-3xl font-bold mb-6">Join Our Community Today!</h2>
        <ul className="space-y-4">
          {[
            "Access exclusive content",
            "Connect with like-minded individuals",
            "Stay updated with the latest trends",
            "Participate in engaging discussions",
          ].map((benefit, index) => (
            <li key={index} className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5" />
              <span>{benefit}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm opacity-80">
          Sign up now and experience the difference. Our platform is designed to help you grow,
          learn, and succeed in your journey.
        </p>
      </div>
    </div>
  )
}
