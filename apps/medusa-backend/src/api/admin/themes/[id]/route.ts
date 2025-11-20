import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { Modules } from "@medusajs/framework/utils"
import ThemeModuleService from "../../../../modules/theme/service"
import { THEME_MODULE } from "../../../../modules/theme"
import CategoryThemeLink from "../../../../links/category-theme"
import type { PostAdminUpdateThemeSchema } from "../validators"

// GET /admin/themes/:id - Get single theme
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const themeService: ThemeModuleService = req.scope.resolve(THEME_MODULE)
  const query = req.scope.resolve("query")
  
  const theme = await themeService.retrieveTheme(req.params.id)
  
  if (!theme) {
    res.status(404).json({ message: "Theme not found" })
    return
  }

  // Query linked category for this theme
  try {
    const { data: categoryThemeLinks } = await query.graph({
      entity: CategoryThemeLink.entryPoint,
      fields: ["*", "product_category.*", "theme.*"],
      filters: {
        theme_id: req.params.id,
      },
    })

    // Attach category to theme
    const category = categoryThemeLinks && categoryThemeLinks.length > 0
      ? categoryThemeLinks[0].product_category
      : null

    const themeWithCategory = {
      ...theme,
      category,
    }

    res.json({ theme: themeWithCategory })
  } catch (error) {
    console.error("Error fetching theme with category:", error)
    // Return theme without category if query fails
    res.json({ theme })
  }
}

// POST /admin/themes/:id - Update theme
export async function POST(
  req: MedusaRequest<PostAdminUpdateThemeSchema>,
  res: MedusaResponse
): Promise<void> {
  const themeService: ThemeModuleService = req.scope.resolve(THEME_MODULE)
  const link = req.scope.resolve(ContainerRegistrationKeys.LINK)
  const query = req.scope.resolve("query")

  if(!req.params.id) {
     res.status(400).json({ error: "Theme ID is required" })
     return;
  }
  
  // Extract category_id from body before updating
  const { category_id, ...updateData } = req.validatedBody
  
  // If setting as active, deactivate all other themes first
  if (req.validatedBody.is_active) {
    await themeService.setActiveTheme(req.params.id)
  }
  
  // Update theme
  const theme = await themeService.updateThemes({
    id: req.params.id, 
    ...updateData
  })

  // Handle category linking
  if (category_id !== undefined) {
    try {
      // First, dismiss any existing link for this theme
      const { data: existingLinks } = await query.graph({
        entity: CategoryThemeLink.entryPoint,
        fields: ["*"],
        filters: {
          theme_id: req.params.id,
        },
      })

      if (existingLinks && existingLinks.length > 0) {
        for (const existingLink of existingLinks) {
          await link.dismiss({
            [Modules.PRODUCT]: {
              product_category_id: existingLink.product_category_id,
            },
            [THEME_MODULE]: {
              theme_id: req.params.id,
            },
          })
        }
      }

      // Create new link if category_id is provided
      if (category_id) {
        await link.create({
          [Modules.PRODUCT]: {
            product_category_id: category_id,
          },
          [THEME_MODULE]: {
            theme_id: req.params.id,
          },
        })
      }
    } catch (error) {
      console.error("Failed to update theme-category link:", error)
      // Continue even if linking fails
    }
  }

  // Fetch theme with category
  try {
    const { data: categoryThemeLinks } = await query.graph({
      entity: CategoryThemeLink.entryPoint,
      fields: ["*", "product_category.*", "theme.*"],
      filters: {
        theme_id: req.params.id,
      },
    })

    const category = categoryThemeLinks && categoryThemeLinks.length > 0
      ? categoryThemeLinks[0].product_category
      : null

    const themeWithCategory = {
      ...theme,
      category,
    }

    res.json({ theme: themeWithCategory })
  } catch (error) {
    console.error("Error fetching theme with category:", error)
    res.json({ theme })
  }
}

// DELETE /admin/themes/:id - Delete theme
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const themeService: ThemeModuleService = req.scope.resolve(THEME_MODULE)
  
  await themeService.deleteThemes(req.params.id)
  
  res.status(200).json({ id: req.params.id, deleted: true })
}

