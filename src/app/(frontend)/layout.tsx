import React, { PropsWithChildren } from "react"
import "./styles.css"
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
        <body>
          <main>{children}</main>
        </body>
      </html>
    </Providers>
  )
}
