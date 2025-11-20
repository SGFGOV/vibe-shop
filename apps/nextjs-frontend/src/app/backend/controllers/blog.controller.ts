// DEPRECATED: This controller is kept for backward compatibility
// All functions now delegate to blog.controller.medusa which uses MedusaJS
// Read-only: Blog management is done via Medusa Admin
// Migrate to using blog.controller.medusa directly

import type { Blog } from "@/types";
import {
  getAllBlogs as getMedusaBlogs,
  getBlogById as getMedusaBlogById,
} from "./blog.controller.medusa";

// Re-export for backward compatibility (read-only)
export async function getAllBlogs(): Promise<Blog[]> {
  return getMedusaBlogs();
}

export async function getBlogById(id: string): Promise<Blog | null> {
  return getMedusaBlogById(id);
}

