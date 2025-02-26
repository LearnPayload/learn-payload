import React, { PropsWithChildren } from "react"

export default async function RootLayout({ children }: PropsWithChildren) {
  return <div className="h-screen flex flex-col">{children}</div>
}
