/**
 * Medusa Type Compatibility Layer
 * 
 * This file provides type compatibility between custom types and MedusaJS types.
 * It ensures seamless integration between the custom codebase and MedusaJS.
 */

import type { StoreProduct, StoreProductCategory, StoreCart, StoreCustomer } from "@medusajs/types";
import type { Product, Category, CategoryImage, User } from "@/types";
import type { Cart } from "../hooks/useMedusaCart";

/**
 * Type guards and compatibility helpers
 */

// Product compatibility
export type MedusaProduct = StoreProduct;
export type CustomProduct = Product;

/**
 * Convert Medusa StoreProduct to custom Product format
 */
export function medusaProductToProduct(medusaProduct: StoreProduct): Product {
  return {
    id: medusaProduct.id,
    name: medusaProduct.title || "",
    slug: medusaProduct.handle || "",
    description: medusaProduct.description || "",
    image: medusaProduct.images?.map((img) => img.url || "") || [],
    prices: {
      originalPrice: medusaProduct.variants?.[0]?.calculated_price?.original_amount || 0,
      price: medusaProduct.variants?.[0]?.calculated_price?.calculated_amount || 0,
    },
    variants: medusaProduct.variants?.map((v) => ({
      id: v.id,
      title: v.title || "",
      price: v.calculated_price?.calculated_amount || 0,
      stock: v.inventory_quantity || 0,
    })),
    stock: medusaProduct.variants?.[0]?.inventory_quantity || 0,
    status: medusaProduct.status === "published" ? "show" : "hide",
    category: medusaProduct.categories?.[0]?.name || "",
    categoryId: medusaProduct.categories?.[0]?.id || "",
  };
}

/**
 * Convert custom Product to Medusa StoreProduct format (for reference)
 */
export function productToMedusaProduct(product: Product): Partial<StoreProduct> {
  return {
    id: product.id || product._id,
    title: product.name,
    handle: product.slug,
    description: product.description,
    status: product.status === "show" ? "published" : "draft",
  };
}

// Category compatibility
export type MedusaCategory = StoreProductCategory;
export type CustomCategory = Category;

/**
 * Convert Medusa StoreProductCategory to custom Category format
 * Note: Category images should be fetched separately and passed via the category controller
 */
export function medusaCategoryToCategory(
  medusaCategory: StoreProductCategory,
  images: CategoryImage[] = []
): Category {
  // Get thumbnail image (prefer thumbnail type, fallback to first image)
  const thumbnailImage = images.find((img) => img.type === "thumbnail") || images[0];
  const imageUrl = thumbnailImage?.url || "";
  
  return {
    id: medusaCategory.id,
    name: medusaCategory.name || "",
    slug: medusaCategory.handle || "",
    description: medusaCategory.description || "",
    image: imageUrl,
    ...(images.length > 0 && { images }),
    status: "show", // Medusa categories are typically active
    children: medusaCategory.category_children?.map((child) => ({
      id: child.id,
      name: child.name || "",
      slug: child.handle || "",
    })),
  } as Category;
}

// Cart compatibility
export type MedusaCart = StoreCart;
export type CustomCart = Cart;

/**
 * Cart type from useMedusaCart hook is compatible with StoreCart
 * The hook already handles the conversion properly
 */

// Customer/User compatibility
export type MedusaCustomer = StoreCustomer;
export type CustomUser = User;

/**
 * Convert Medusa StoreCustomer to custom User format
 */
export function medusaCustomerToUser(medusaCustomer: StoreCustomer): User {
  return {
    id: medusaCustomer.id,
    email: medusaCustomer.email || "",
    name: `${medusaCustomer.first_name || ""} ${medusaCustomer.last_name || ""}`.trim(),
    role: "Customer",
    status: "show",
    contact: medusaCustomer.phone || "",
    address: medusaCustomer.addresses?.[0]?.address_1 || "",
  };
}

/**
 * Type exports for use throughout the application
 */
export type {
  StoreProduct,
  StoreProductCategory,
  StoreCart,
  StoreCustomer,
} from "@medusajs/types";

