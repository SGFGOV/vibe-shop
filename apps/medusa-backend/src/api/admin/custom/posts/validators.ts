import { z } from "zod";

/**
 * Validation schemas for Blog Post API routes
 */

// Schema for creating a blog post (POST /admin/posts)
export const PostAdminCreatePostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  theme: z.array(z.string()).optional(),
  image: z.string().url("Image must be a valid URL").or(z.literal("")),
  status: z.enum(["show", "hide"]).default("show"),
  updateDate: z.string().datetime().optional().or(z.literal("")),
});

// Schema for updating a blog post (POST /admin/posts/:id)
export const PostAdminUpdatePostSchema = z.object({
  title: z.string().min(1, "Title is required").optional(),
  category: z.string().min(1, "Category is required").optional(),
  description: z.string().min(1, "Description is required").optional(),
  theme: z.array(z.string()).optional(),
  image: z.string().url("Image must be a valid URL").optional().or(z.literal("")),
  status: z.enum(["show", "hide"]).optional(),
  updateDate: z.string().datetime().optional().or(z.literal("")),
});

export type PostAdminCreatePostSchema = z.infer<typeof PostAdminCreatePostSchema>;
export type PostAdminUpdatePostSchema = z.infer<typeof PostAdminUpdatePostSchema>;

