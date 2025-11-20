import { model } from "@medusajs/framework/utils"

export const Brand = model.define("brand", {
  id: model.id().primaryKey(),
  name: model.text(),
  icon: model.text(), // URL to brand icon/image
  status: model.text().default("show"), // "show" or "hide"
})

