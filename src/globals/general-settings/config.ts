import { GlobalConfig } from 'payload'

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
      required: true,
    },
  ],
}
