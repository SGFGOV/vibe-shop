// MedusaJS-based Product Controller
// This is the new implementation using MedusaJS SDK
// Read-only: Product management is done via Medusa Admin
// Gradually migrate from product.controller.js to this file

import { sdk } from "../../../lib/sdk";
import type { Product } from "@/types";
import type { StoreProduct } from "@medusajs/types";

interface ProductOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
  next?: { tags: string[] };
  fields?: string;
}

/**
 * Get all products using MedusaJS Store API
 */
export async function getAllProducts(
  options: ProductOptions = {}
): Promise<Product[]> {
  try {
    const { products = [] } = await sdk.store.product.list(
      {
        limit: options.limit || 100,
        offset: options.offset || 0,
        ...options.filters,
      },
      {
        next: options.next || { tags: ["products"] },
      }
    );

    return products.map((product: StoreProduct) => transformMedusaProduct(product));
  } catch (error) {
    console.error("Error fetching products from MedusaJS:", error);
    return [];
  }
}

/**
 * Get single product by ID using MedusaJS Store API
 */
export async function getProductById(
  id: string,
  options: ProductOptions = {}
): Promise<Product | null> {
  if (!id) {
    console.error("Product ID is required");
    return null;
  }

  try {
    const { product } = await sdk.store.product.retrieve(
      id,
      {
        fields: options.fields || "*variants,*images,*categories,*collection",
      },
      {
        next: options.next || { tags: ["product", id] },
      }
    );

    if (!product) {
      return null;
    }

    return transformMedusaProduct(product as StoreProduct);
  } catch (error) {
    console.error("Error fetching product from MedusaJS:", error);
    return null;
  }
}

/**
 * Get products by IDs using MedusaJS Store API
 */
export async function getProductByIds(productIds: string[]): Promise<Product[]> {
  if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
    console.error("Invalid product IDs array");
    return [];
  }

  try {
    const { products = [] } = await sdk.store.product.list(
      {
        id: productIds,
        limit: productIds.length,
      },
      {
        next: { tags: ["products"] },
      }
    );

    return products.map((product: StoreProduct) => transformMedusaProduct(product));
  } catch (error) {
    console.error("Error fetching products by IDs from MedusaJS:", error);
    return [];
  }
}

/**
 * Transform MedusaJS product to match your current product structure
 */
function transformMedusaProduct(medusaProduct: StoreProduct): Product {
  const product = medusaProduct as StoreProduct & {
    title?: string;
    description?: string;
    handle?: string;
    status?: string;
    images?: Array<{ url?: string }>;
    variants?: Array<{
      id: string;
      title?: string;
      prices?: Array<{ amount?: number; currency_code?: string }>;
      calculated_price?: number;
      original_price?: number;
      inventory_quantity?: number;
      manage_inventory?: boolean;
    }>;
    categories?: Array<{ id?: string; name?: string }>;
    collection?: { title?: string };
    metadata?: Record<string, unknown>;
  };
  const firstVariant = product.variants?.[0];
  // Prices might be on variant or calculated_price/original_price
  const variantPrices = firstVariant?.prices || [];
  const defaultPrice = variantPrices.find((p) => p.currency_code === "usd") || variantPrices[0];
  const calculatedPrice = firstVariant?.calculated_price || defaultPrice?.amount;

  return {
    id: medusaProduct.id,
    productId: medusaProduct.id,
    name: product.title || "",
    title: product.title || "",
    description: product.description || "",
    slug: product.handle || "",
    image: product.images?.map((img) => img.url || "").filter(Boolean) || [],
    category: product.categories?.[0]?.name || "",
    categoryId: product.categories?.[0]?.id || "",
    brand: (product.metadata?.brand as string) || product.collection?.title || "",
    prices: {
      originalPrice: (firstVariant?.original_price || calculatedPrice || 0) / 100,
      price: (calculatedPrice || 0) / 100,
      discount: 0,
    },
    variants: product.variants?.map((variant) => ({
      id: variant.id,
      title: variant.title || "",
      prices: [], // Prices are accessed through product, not variant in StoreProductVariant
      inventory_quantity: variant.inventory_quantity || 0,
      manage_inventory: variant.manage_inventory,
    })),
    stock: firstVariant?.inventory_quantity || 0,
    status: product.status === "published" ? "show" : "hide",
    medusaId: medusaProduct.id,
    handle: product.handle || "",
    collection: product.collection,
    categories: product.categories,
    metadata: product.metadata,
    _medusaProduct: medusaProduct,
  } as Product;
}


