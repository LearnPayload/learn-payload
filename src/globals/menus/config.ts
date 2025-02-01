import { GlobalConfig } from 'payload'
import slugify from 'slugify'
import { revalidateNavigation } from './revalidate-navigation'

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
        {
          name: 'menuSlug',
          type: 'text',
          required: true,
          hooks: {
            beforeValidate: [({ siblingData }) => slugify(siblingData.menuName, { lower: true })],
          },
          index: true,
          admin: {
            readOnly: true,
            hidden: true,
          },
        },
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
    afterChange: [revalidateNavigation],
  },
}
