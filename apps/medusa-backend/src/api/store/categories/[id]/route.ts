import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { Modules } from "@medusajs/framework/utils"
import CategoryThemeLink from "../../../../links/category-theme"
import { getDefaultTheme } from "../../../../modules/theme/defaults"

/**
 * GET /store/categories/:id
 * Get a single product category with its linked theme
 * Uses Query to retrieve category with linked theme data
 */
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const query = req.scope.resolve("query")
  const productModuleService = req.scope.resolve(Modules.PRODUCT)
  const categoryId = req.params.id

  try {
    // Get category from Product Module
    const category = await productModuleService.retrieveProductCategory(categoryId)

    if (!category) {
      res.status(404).json({ message: "Category not found" })
      return
    }

    // Query linked theme for this category
    const { data: categoryThemeLinks } = await query.graph({
      entity: CategoryThemeLink.entryPoint,
      fields: ["*", "product_category.*", "theme.*"],
      filters: {
        product_category_id: categoryId,
      },
    })

    // Attach theme to category, use default theme if none linked
    const defaultTheme = getDefaultTheme()
    const theme = categoryThemeLinks && categoryThemeLinks.length > 0
      ? categoryThemeLinks[0].theme
      : defaultTheme

    const categoryWithTheme = {
      ...category,
      theme,
    }

    res.json({ product_category: categoryWithTheme })
  } catch (error) {
    console.error("Error fetching category with theme:", error)
    res.status(500).json({ message: "Failed to fetch category" })
  }
}

