import { model } from "@medusajs/framework/utils"

/**
 * Theme Model
 * Stores theme customization settings for the storefront
 * The settings field stores a JSON object with all theme configurations
 */
export const Theme = model.define("theme", {
  id: model.id().primaryKey(),
  name: model.text(), // Name of the theme (e.g., "storeCustomizationSetting")
  settings: model.json(), // JSON object containing all theme settings (common, home, home2, home4, home5, terms, contact, about)
  is_active: model.boolean().default(false), // Whether this is the active theme
})

