import { GlobalConfig } from 'payload'
import { afterChangeHook } from './hooks'

export const GeneralSettings: GlobalConfig = {
  slug: 'generalSettings',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}
