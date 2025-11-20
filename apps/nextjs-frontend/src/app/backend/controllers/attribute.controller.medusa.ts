// MedusaJS-based Attribute Controller
// Attributes in MedusaJS are handled through Product Options

import { sdk } from "../../../lib/sdk";
import type { ApiResponse } from "@/types";

interface Attribute {
  _id?: string;
  id?: string;
  name: string;
  values?: string[];
  [key: string]: unknown;
}

interface MedusaProductOption {
  id: string;
  title: string;
  values?: Array<{
    id: string;
    value: string;
  }>;
  product_id?: string;
  [key: string]: unknown;
}

/**
 * Get all product options (attributes) using MedusaJS
 * Note: In MedusaJS, attributes are called "product options"
 */
export async function getAllAttributes(): Promise<Attribute[]> {
  try {
    // Get all products and extract their options
    // Note: MedusaJS doesn't have a global "options" endpoint
    // Options are product-specific, so we need to get products first
    const { products = [] } = await sdk.store.product.list({
      limit: 100,
    });

    // Extract unique options from all products
    const optionsMap = new Map<string, Attribute>();
    
    for (const product of products) {
      if (product.options) {
        for (const option of product.options as MedusaProductOption[]) {
          if (!optionsMap.has(option.title)) {
            optionsMap.set(option.title, {
              id: option.id,
              _id: option.id,
              name: option.title,
              values: option.values?.map((v) => v.value) || [],
            });
          } else {
            // Merge values if option already exists
            const existing = optionsMap.get(option.title)!;
            const newValues = option.values?.map((v) => v.value) || [];
            const uniqueValues = Array.from(
              new Set([...existing.values || [], ...newValues])
            );
            existing.values = uniqueValues;
          }
        }
      }
    }

    return Array.from(optionsMap.values());
  } catch (error) {
    console.error("Error fetching attributes from MedusaJS:", error);
    return [];
  }
}


