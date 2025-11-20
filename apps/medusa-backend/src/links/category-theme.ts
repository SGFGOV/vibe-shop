import ThemeModule from "../modules/theme"
import ProductModule from "@medusajs/medusa/product"
import { defineLink } from "@medusajs/framework/utils"

/**
 * Link between Product Category and Theme (1:1 relationship)
 * Each category can have one theme, and each theme belongs to one category
 */
export default defineLink(
  ProductModule.linkable.product_category,
  ThemeModule.linkable.theme
)

