/**
 * @deprecated This controller is kept for backward compatibility
 * All functions now delegate to product.controller.medusa which uses MedusaJS
 * Migrate to using product.controller.medusa directly
 */

import type { Product, ApiResponse } from "@/types";
import {
  getAllProducts as getMedusaProducts,
  getProductById as getMedusaProductById,
  getProductByIds as getMedusaProductByIds,
} from "./product.controller.medusa";

// Re-export for backward compatibility
export async function getAllProducts(): Promise<Product[]> {
  return getMedusaProducts();
}

export async function getProductById(id: string): Promise<Product | null> {
  return getMedusaProductById(id);
}

export async function getProductByIds(productIds: string[]): Promise<ApiResponse<{ products: Product[] }> | null> {
  const products = await getMedusaProductByIds(productIds);
  return products ? { products } : null;
}
