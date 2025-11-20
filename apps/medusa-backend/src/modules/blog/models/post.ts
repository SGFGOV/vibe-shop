import { model } from "@medusajs/framework/utils"

export const Post = model.define("post", {
  id: model.id().primaryKey(),
  title: model.text(),
  category: model.text(),
  description: model.text(),
  theme: model.array(), // Array of theme tags (strings)
  image: model.text(), // URL to blog image
  status: model.text().default("show"), // "show" or "hide"
  updateDate: model.dateTime().nullable(),
})

