import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import CategoryThemeLink from "../../../links/category-theme"
import { getDefaultTheme } from "../../../modules/theme/defaults"

/**
 * GET /admin/product-categories
 * List all product categories with their linked themes
 * Uses Query to retrieve categories with linked theme data
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve("query")
  const productModuleService = req.scope.resolve(Modules.PRODUCT)

  try {
    // Get categories from Product Module
    const categories = await productModuleService.listProductCategories()

    // If no categories, return empty array
    if (!categories || categories.length === 0) {
      res.json({ product_categories: [] })
      return
    }

    // Get category IDs
    const categoryIds = categories.map((cat: { id: string }) => cat.id)

    // Query linked themes for all categories
    const { data: categoryThemeLinks } = await query.graph({
      entity: CategoryThemeLink.entryPoint,
      fields: ["*", "product_category.*", "theme.*"],
      filters: {
        product_category_id: {
          $in: categoryIds,
        },
      },
    })

    // Create a map of category_id -> theme
    const themeMap = new Map()
    categoryThemeLinks.forEach((link: { product_category_id: string; theme: unknown }) => {
      if (link.theme) {
        themeMap.set(link.product_category_id, link.theme)
      }
    })

    // Attach themes to categories, use default theme if none linked
    const defaultTheme = getDefaultTheme()
    const categoriesWithThemes = categories.map((category: { id: string }) => ({
      ...category,
      theme: themeMap.get(category.id) || defaultTheme,
    }))

    res.json({ product_categories: categoriesWithThemes })
  } catch (error) {
    console.error("Error fetching categories with themes:", error)
    // Fallback to categories without themes
    const categories = await productModuleService.listProductCategories()
    res.json({ product_categories: categories })
  }
}

