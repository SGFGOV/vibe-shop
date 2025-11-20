/**
 * Default theme settings
 * Used when a category doesn't have a linked theme
 */
export function getDefaultThemeSettings(): Record<string, unknown> {
  return {
    common: {
      active_theme: "Grocery",
      active_themes: [
        { value: "Grocery", label: "Grocery" },
        { value: "Halal Food", label: "Halal Food" },
        { value: "Furniture", label: "Furniture" },
        { value: "Medicine", label: "Medicine" },
        { value: "Halal Meat", label: "Halal Meat" },
      ],
    },
    home: {},
    home2: {},
    home4: {},
    home5: {},
    terms: {},
    contact: {},
    about: {},
  }
}

/**
 * Get default theme object structure
 * Returns a theme-like object with default settings
 */
export function getDefaultTheme() {
  return {
    id: "default",
    name: "Default Theme",
    settings: getDefaultThemeSettings(),
    is_active: false,
  }
}

