import React from 'react'
import './styles.css'
import { Header } from '@/components/frontend/layout/header'
import { Footer } from '@/components/frontend/layout/footer'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Learn Payload with Colyn',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white h-screen">
        <div className="h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
