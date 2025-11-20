import { z } from "zod";

/**
 * Validation schemas for Category Images API routes
 */

// Schema for creating a category image (POST /admin/category-images)
export const PostAdminCreateCategoryImageSchema = z.object({
  url: z.string().url("URL must be a valid URL"),
  file_id: z.string().optional(),
  type: z.enum(["thumbnail", "image"], {
    errorMap: () => ({ message: "type must be either 'thumbnail' or 'image'" }),
  }),
  category_id: z.string().min(1, "category_id is required"),
});

// Schema for updating a category image (POST /admin/category-images/:id)
export const PostAdminUpdateCategoryImageSchema = z.object({
  url: z.string().url("URL must be a valid URL").optional(),
  file_id: z.string().optional(),
  type: z.enum(["thumbnail", "image"], {
    errorMap: () => ({ message: "type must be either 'thumbnail' or 'image'" }),
  }).optional(),
});

export type PostAdminCreateCategoryImageSchema = z.infer<typeof PostAdminCreateCategoryImageSchema>;
export type PostAdminUpdateCategoryImageSchema = z.infer<typeof PostAdminUpdateCategoryImageSchema>;

