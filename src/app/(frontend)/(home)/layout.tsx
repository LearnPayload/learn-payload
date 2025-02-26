import { Footer } from "@/components/frontend/layout/footer"
import { Header } from "@/components/frontend/layout/header"
import React, { PropsWithChildren } from "react"

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen bg-[#283333] text-white flex flex-col justify-between">
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  )
}
