import React from 'react'
import './styles.css'
import { Providers } from '@/components/frontend/providers/providers'
import { Header } from '@/components/frontend/layout/header'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <Providers>
      <html lang="en">
        <body>
          <Header />
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  )
}
