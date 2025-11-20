/**
 * @deprecated This controller is kept for backward compatibility
 * Attributes in MedusaJS are handled through Product Options
 * Migrate to using attribute.controller.medusa or sdk.admin.product.* directly
 * 
 * Note: In MedusaJS, product options (attributes) are product-specific,
 * not global. They must be created/updated/deleted per product.
 */

import {
  getAllAttributes as getMedusaAttributes,
} from "./attribute.controller.medusa";

interface Attribute {
  _id?: string;
  id?: string;
  name: string;
  values?: string[];
  [key: string]: unknown;
}

// Re-export for backward compatibility
export async function getAllAttributes(): Promise<Attribute[]> {
  return getMedusaAttributes();
}

