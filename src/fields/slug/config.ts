import type { CollectionConfig } from 'payload'

export const slugField: CollectionConfig['fields'] = [
  {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,

    admin: {
      position: 'sidebar',
      components: {
        Field: '@/fields/slug/SlugField#SlugField',
        Label: '@/fields/slug/SlugLabel#SlugLabel',
      },
    },
  },
]
