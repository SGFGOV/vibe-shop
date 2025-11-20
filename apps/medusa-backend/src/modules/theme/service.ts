import { MedusaService } from "@medusajs/utils"
import { Theme } from "./models/theme"

class ThemeModuleService extends MedusaService({
  Theme,
}) {
  // Custom methods can be added here if needed
  // The service factory automatically generates:
  // - createThemes()
  // - listThemes()
  // - retrieveTheme()
  // - updateThemes()
  // - deleteThemes()
  
  /**
   * Get the active theme
   */
  async getActiveTheme() {
    const themes = await this.listThemes()
    return themes.find((theme: { is_active: boolean }) => theme.is_active) || null
  }
  
  /**
   * Set a theme as active (deactivates all others)
   */
  async setActiveTheme(themeId: string) {
    // Deactivate all themes
    const allThemes = await this.listThemes()
    for (const theme of allThemes) {
      if (theme.id !== themeId && theme.is_active) {
        await this.updateThemes({ id: theme.id, is_active: false })
      }
    }
    
    // Activate the specified theme
    return await this.updateThemes({ id: themeId, is_active: true })
  }
}

export default ThemeModuleService

