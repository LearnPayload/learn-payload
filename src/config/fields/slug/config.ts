import type { CollectionConfig } from "payload"
import slugify from "slugify"

export const slugField = (fieldName: string): CollectionConfig["fields"] => [
  {
    name: "slug",
    type: "text",
    required: true,
    index: true,
    unique: true,
    hooks: {
      beforeValidate: [
        ({ siblingData }) => slugify(siblingData[fieldName], { lower: true }),
      ],
    },
    admin: {
      readOnly: false,
      position: "sidebar",
    },
  },
]
