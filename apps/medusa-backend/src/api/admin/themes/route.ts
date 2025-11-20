import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { Modules } from "@medusajs/framework/utils"
import ThemeModuleService from "../../../modules/theme/service"
import { THEME_MODULE } from "../../../modules/theme"
import CategoryThemeLink from "../../../links/category-theme"
import { PostAdminCreateThemeSchema } from "./validators"

// GET /admin/themes - List all themes
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const themeService: ThemeModuleService = req.scope.resolve(THEME_MODULE)
  const query = req.scope.resolve("query")
  
  const themes = await themeService.listThemes()
  
  // If no themes, return empty array
  if (!themes || themes.length === 0) {
    res.json({ themes: [] })
    return
  }

  // Get theme IDs
  const themeIds = themes.map((theme: { id: string }) => theme.id)

  // Query linked categories for all themes
  try {
    const { data: categoryThemeLinks } = await query.graph({
      entity: CategoryThemeLink.entryPoint,
      fields: ["*", "product_category.*", "theme.*"],
      filters: {
        theme_id: {
          $in: themeIds,
        },
      },
    })

    // Create a map of theme_id -> category
    const categoryMap = new Map()
    categoryThemeLinks.forEach((link: { theme_id: string; product_category: unknown }) => {
      if (link.product_category) {
        categoryMap.set(link.theme_id, link.product_category)
      }
    })

    // Attach categories to themes
    const themesWithCategories = themes.map((theme: { id: string }) => ({
      ...theme,
      category: categoryMap.get(theme.id) || null,
    }))

    res.json({ themes: themesWithCategories })
  } catch (error) {
    console.error("Error fetching themes with categories:", error)
    // Fallback to themes without categories
    res.json({ themes })
  }
}

// POST /admin/themes - Create a theme
export async function POST(
  req: MedusaRequest<PostAdminCreateThemeSchema>,
  res: MedusaResponse
): Promise<void> {
  const themeService: ThemeModuleService = req.scope.resolve(THEME_MODULE)
  const link = req.scope.resolve(ContainerRegistrationKeys.LINK)
  
  // Create the theme first (without is_active and category_id to avoid issues)
  const { is_active: isActive, category_id, ...createData } = req.validatedBody
  
  const theme = await themeService.createThemes(createData)
  
  // If this theme should be active, set it as active (which deactivates others)
  if (isActive) {
    await themeService.setActiveTheme(theme.id)
  }

  // Link theme to category if category_id is provided
  if (category_id) {
    try {
      await link.create({
        [Modules.PRODUCT]: {
          product_category_id: category_id,
        },
        [THEME_MODULE]: {
          theme_id: theme.id,
        },
      })
    } catch (error) {
      console.error("Failed to link theme to category:", error)
      // Continue even if linking fails
    }
  }

  // Fetch the updated theme
  const updatedTheme = await themeService.retrieveTheme(theme.id)
  res.json({ theme: updatedTheme })
}

