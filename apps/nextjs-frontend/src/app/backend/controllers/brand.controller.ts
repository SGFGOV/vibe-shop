// DEPRECATED: This controller is kept for backward compatibility
// All functions now delegate to brand.controller.medusa which uses MedusaJS
// Read-only: Brand management is done via Medusa Admin
// Migrate to using brand.controller.medusa directly

import type { Brand } from "@/types";
import {
  getAllBrands as getMedusaBrands,
  getBrandById as getMedusaBrandById,
} from "./brand.controller.medusa";

// Re-export for backward compatibility (read-only)
export async function getAllBrands(): Promise<Brand[]> {
  return getMedusaBrands();
}

export async function getBrandById(id: string): Promise<Brand | null> {
  return getMedusaBrandById(id);
}
