import type { CollectionConfig } from 'payload'
import { createId } from '@paralleldrive/cuid2'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  fields: [
    {
      name: 'id',
      type: 'text',
      required: true,
      unique: true,
      defaultValue: () => {
        return createId()
      },
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    // Email added by default
    // Add more fields as needed
  ],
}
