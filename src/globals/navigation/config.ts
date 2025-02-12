import { GlobalConfig } from 'payload'
import { afterChangeHook } from './hooks'
import { slugField } from '@/fields/slug/config'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  fields: [
    {
      name: 'menus',
      type: 'array',
      required: true,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/components/admin/menu-row-label#MenuRowLabel',
        },
      },
      fields: [
        {
          name: 'menuName',
          label: 'Menu Name',
          type: 'text',
          required: true,
        },
        ...slugField('menuName'),
        {
          name: 'menuItems',
          type: 'array',
          admin: {
            initCollapsed: true,
            components: {
              RowLabel: '@/components/admin/menu-item-row-label#MenuItemRowLabel',
            },
          },
          fields: [
            {
              name: 'URL',
              type: 'text',
              required: true,
            },
            {
              name: 'label',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
  hooks: {
    afterChange: [afterChangeHook],
  },
}
