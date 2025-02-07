import { slugField } from '@/fields/slug/config'
import type { CollectionConfig, Field } from 'payload'

export const Properties: CollectionConfig = {
  slug: 'properties',
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Description',
          fields: [
            {
              type: 'richText',
              name: 'content',
            },
          ],
        },
      ],
    },
    ...([] as Field[]).concat(slugField),
  ],
}
