import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'

import config from '@/payload.config'
import './styles.css'
import Link from 'next/link'

export default async function HomePage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { title, tagline } = await payload.findGlobal({
    slug: 'generalSettings',
  })

  return (
    <div className="h-[590px] flex items-center justify-center flex-col">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">
        <picture>
          <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
          <Image
            alt="Payload Logo"
            height={65}
            src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
            width={65}
          />
        </picture>
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-5xl font-extrabold">{title}</h1>
          <h2 className="text-3xl font-semibold">{tagline}</h2>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href={payloadConfig.routes.admin}
            rel="noopener noreferrer"
            className="rounded px-4 py-2 flex bg-white text-black font-semibold"
            target="_blank"
          >
            Go to admin panel
          </Link>
          <Link
            className="rounded px-4 py-2 flex border border-white text-white font-semibold"
            href="https://payloadcms.com/docs"
            rel="noopener noreferrer"
            target="_blank"
          >
            Documentation
          </Link>
        </div>
      </div>
    </div>
  )
}
