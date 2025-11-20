import Medusa from "@medusajs/js-sdk";

// Get Medusa backend URL from environment variables
export let MEDUSA_BACKEND_URL = "http://localhost:9000";

if (process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL) {
  MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
}

// Get publishable API key from environment variables
const publishableKey = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;

// Create and export the Medusa SDK instance
export const sdk = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: publishableKey,
});

// Export types for TypeScript support (if using TypeScript)
export type { StoreProduct, StoreProductCategory, StoreCart, StoreCustomer } from "@medusajs/types";

