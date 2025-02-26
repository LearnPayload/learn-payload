interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthSimpleLayout({ children }: AuthLayoutProps) {
  return (
    <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-8">{children}</div>
      </div>
    </div>
  )
}
