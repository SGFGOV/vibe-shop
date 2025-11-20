import { z } from "zod";

/**
 * Validation schemas for Theme API routes
 */

// Schema for theme settings - accepts any JSON object
const ThemeSettingsSchema = z.record(z.unknown());

// Schema for creating a theme (POST /admin/themes)
export const PostAdminCreateThemeSchema = z.object({
  name: z.string().min(1, "Theme name is required"),
  settings: ThemeSettingsSchema,
  is_active: z.boolean().optional().default(false),
  category_id: z.string().optional(), // Optional category ID to link theme to category
});

// Schema for updating a theme (POST /admin/themes/:id)
export const PostAdminUpdateThemeSchema = z.object({
  name: z.string().min(1, "Theme name is required").optional(),
  settings: ThemeSettingsSchema.optional(),
  is_active: z.boolean().optional(),
  category_id: z.string().optional(), // Optional category ID to link theme to category
});

export type PostAdminCreateThemeSchema = z.infer<typeof PostAdminCreateThemeSchema>;
export type PostAdminUpdateThemeSchema = z.infer<typeof PostAdminUpdateThemeSchema>;

