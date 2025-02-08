'use server'
import { getPayload, File } from 'payload'
import configPromise from '@payload-config'
//
export async function seed() {
  const payload = await getPayload({ config: configPromise })

  const [logoBuffer] = await Promise.all([
    fetchFileByURL(
      'https://raw.githubusercontent.com/LearnPayload/learn-payload/refs/heads/main/logo.svg',
    ),
  ])
  const logoProps = {
    alt: 'Logo',
    updatedAt: '2025-02-08T16:07:57.210Z',
    createdAt: '2025-02-08T16:07:57.195Z',
    filename: 'logo-4.svg',
  }

  const [_, logo] = await Promise.all([
    payload.db.deleteMany({ collection: 'media', where: {} }),
    payload.create({
      collection: 'media',
      data: logoProps,
      file: logoBuffer,
    }),
  ])

  // General Settings
  await Promise.all([
    payload.updateGlobal({
      slug: 'generalSettings',
      data: {
        title: 'Learn Payload with Colyn',
        tagline: 'A great way to learn Payload',
        logo: logo.id,
      },
    }),
  ])

  // Navigation
  await Promise.all([
    payload.updateGlobal({
      slug: 'navigation',
      data: {
        menus: [
          {
            menuName: 'Main',
            slug: 'main',
            menuItems: [
              {
                label: 'Home',
                URL: '/',
              },
              {
                label: 'About',
                URL: '/about',
              },
              {
                label: 'Contact',
                URL: '/contact',
              },
            ],
          },
        ],
      },
    }),
  ])
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
