import { type CollectionConfig } from "payload"
import { createId } from "@paralleldrive/cuid2"

export const Users: CollectionConfig = {
  slug: "users",
  admin: {
    useAsTitle: "email",
  },
  auth: true,
  fields: [
    {
      name: "id",
      type: "text",
      required: true,
      unique: true,
      defaultValue: () => {
        return createId()
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "login_token",
      type: "text",
      required: false,
      admin: { disabled: true },
    },
    {
      name: "login_token_expiration",
      type: "date",
      required: false,
      admin: { disabled: true },
    },
    // Email added by default
    // Add more fields as needed
  ],
}
