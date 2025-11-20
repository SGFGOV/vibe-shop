import { z } from "zod";

/**
 * Validation schemas for Brand API routes
 */

// Schema for creating a brand (POST /admin/brands)
export const PostAdminCreateBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  icon: z.string().url().optional().or(z.literal("")),
  status: z.enum(["show", "hide"]).default("show"),
});

// Schema for updating a brand (POST /admin/brands/:id)
export const PostAdminUpdateBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required").optional(),
  icon: z.string().url().optional().or(z.literal("")),
  status: z.enum(["show", "hide"]).optional(),
});


export type PostAdminUpdateBrandSchema = z.infer<typeof PostAdminUpdateBrandSchema>;
export type PostAdminCreateBrandSchema = z.infer<typeof PostAdminCreateBrandSchema>;