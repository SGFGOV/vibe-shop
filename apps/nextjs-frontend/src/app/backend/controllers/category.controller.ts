/**
 * @deprecated This controller is kept for backward compatibility
 * All functions now delegate to category.controller.medusa which uses MedusaJS
 * Migrate to using category.controller.medusa directly
 */

import type { Category } from "@/types";
import {
  getAllCategories as getMedusaCategories,
  getCategoryById as getMedusaCategoryById,
} from "./category.controller.medusa";

// Re-export for backward compatibility
export async function getAllCategories(): Promise<Category[]> {
  return getMedusaCategories();
}

export async function getCategoryById(id: string): Promise<Category | null> {
  return getMedusaCategoryById(id);
}
