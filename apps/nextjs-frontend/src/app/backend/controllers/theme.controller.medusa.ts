// MedusaJS-based Theme Controller
// This uses the custom Theme module API endpoints

function getMedusaBackendUrl(): string {
  return process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
}

interface Theme {
  id: string;
  name: string;
  settings: Record<string, unknown>;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

interface ThemeOptions {
  next?: { tags: string[] };
}

/**
 * Get the active theme using MedusaJS Custom Theme Module API
 * Returns the theme settings or null if no active theme is found
 */
export async function getActiveTheme(
  options: ThemeOptions = {}
): Promise<Record<string, unknown> | null> {
  try {
    const backendUrl = getMedusaBackendUrl();
    const response = await fetch(`${backendUrl}/store/themes`, {
      next: options.next || { tags: ["theme", "active"] },
    });

    if (!response.ok) {
      if (response.status === 404) {
        // No active theme found
        return null;
      }
      throw new Error(`Failed to fetch theme. Status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract settings from the theme object
    if (data.theme && data.theme.settings) {
      return data.theme.settings as Record<string, unknown>;
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching theme from MedusaJS:", error);
    return null;
  }
}

/**
 * Get all themes (admin only - for future use)
 */
export async function getAllThemes(
  options: ThemeOptions = {}
): Promise<Theme[]> {
  try {
    const backendUrl = getMedusaBackendUrl();
    const response = await fetch(`${backendUrl}/admin/themes`, {
      next: options.next || { tags: ["themes"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch themes. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.themes || [];
  } catch (error) {
    console.error("Error fetching themes from MedusaJS:", error);
    return [];
  }
}

/**
 * Get theme by ID (admin only - for future use)
 */
export async function getThemeById(
  id: string,
  options: ThemeOptions = {}
): Promise<Theme | null> {
  if (!id) {
    console.error("Theme ID is required");
    return null;
  }

  try {
    const backendUrl = getMedusaBackendUrl();
    const response = await fetch(`${backendUrl}/admin/themes/${id}`, {
      next: options.next || { tags: ["theme", id] },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch theme. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.theme || null;
  } catch (error) {
    console.error("Error fetching theme from MedusaJS:", error);
    return null;
  }
}

