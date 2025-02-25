import React, { PropsWithChildren } from "react"
import "../styles.css"
import Providers from "@/components/frontend/providers/providers"
import { getCachedGeneralSettings } from "@/config/globals/general-settings/queries"

export async function generateMetadata() {
  const settings = await getCachedGeneralSettings()
  return {
    title: settings.title,
    description: settings?.tagline ?? "",
  }
}

export default async function RootLayout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <html lang="en">
        <body className="bg-neutral-900 text-white h-screen">
          <div className="h-screen flex flex-col">
            <main className="flex-1">{children}</main>
          </div>
        </body>
      </html>
    </Providers>
  )
}
