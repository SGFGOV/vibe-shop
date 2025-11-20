import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ThemeModuleService from "../../../modules/theme/service"
import { THEME_MODULE } from "../../../modules/theme"
import { getDefaultTheme } from "../../../modules/theme/defaults"

// GET /store/themes - Get active theme (public route)
// Returns default theme if no active theme is found
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const themeService: ThemeModuleService = req.scope.resolve(THEME_MODULE)
  
  // Get the active theme
  const theme = await themeService.getActiveTheme()
  
  // If no active theme found, return default theme
  const themeToReturn = theme || getDefaultTheme()
  
  res.json({ theme: themeToReturn })
}

