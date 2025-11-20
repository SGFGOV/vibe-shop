// MedusaJS-based Category Controller
// This is the new implementation using MedusaJS SDK

import { sdk } from "../../../lib/sdk";
import type { Category } from "@/types";
import type { StoreProductCategory } from "@medusajs/types";

interface CategoryOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
  next?: { tags: string[] };
}

/**
 * Get all categories using MedusaJS Store API
 */
export async function getAllCategories(
  options: CategoryOptions = {}
): Promise<Category[]> {
  try {
    const { product_categories = [] } = await sdk.store.category.list(
      {
        limit: options.limit || 100,
        offset: options.offset || 0,
        ...options.filters,
      },
      {
        next: options.next || { tags: ["categories"] },
      }
    );

    return product_categories.map((category: StoreProductCategory) =>
      transformMedusaCategory(category)
    );
  } catch (error) {
    console.error("Error fetching categories from MedusaJS:", error);
    return [];
  }
}

/**
 * Get single category by ID using MedusaJS Store API
 */
export async function getCategoryById(
  id: string,
  options: CategoryOptions = {}
): Promise<Category | null> {
  if (!id) {
    console.error("Category ID is required");
    return null;
  }

  try {
    const { product_category } = await sdk.store.category.retrieve(
      id,
      {},
      {
        next: options.next || { tags: ["category", id] },
      }
    );

    if (!product_category) {
      return null;
    }

    return transformMedusaCategory(product_category as StoreProductCategory);
  } catch (error) {
    console.error("Error fetching category from MedusaJS:", error);
    return null;
  }
}

/**
 * Transform MedusaJS category to match your current category structure
 */
function transformMedusaCategory(medusaCategory: StoreProductCategory): Category {
  const category = medusaCategory as StoreProductCategory & {
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  
  // Handle parent_category_id which can be string | null in StoreProductCategory
  const parentId = medusaCategory.parent_category_id ?? "";
  
  return {
    id: medusaCategory.id,
    _id: medusaCategory.id,
    name: medusaCategory.name || "",
    slug: medusaCategory.handle || "",
    description: medusaCategory.description || "",
    icon: (medusaCategory.metadata?.icon as string) || "",
    image: (medusaCategory.metadata?.image as string) || "",
    status: category.is_active ? "show" : "hide",
    parent: parentId,
    children: medusaCategory.category_children?.map((child) =>
      transformMedusaCategory(child)
    ),
    theme: (medusaCategory.metadata?.theme as string[]) || [],
    createdAt: category.created_at
      ? new Date(category.created_at)
      : undefined,
    updatedAt: category.updated_at
      ? new Date(category.updated_at)
      : undefined,
  } as Category;
}


