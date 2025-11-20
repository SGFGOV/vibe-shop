// MedusaJS-based Category Controller
// This is the new implementation using MedusaJS SDK

import { sdk, MEDUSA_BACKEND_URL } from "../../../lib/sdk";
import type { Category, CategoryImage } from "@/types";
import type { StoreProductCategory } from "@medusajs/types";

interface CategoryOptions {
  limit?: number;
  offset?: number;
  filters?: Record<string, unknown>;
  next?: { tags: string[] };
  includeImages?: boolean;
}

/**
 * Fetch category images for a category or multiple categories
 */
async function fetchCategoryImages(categoryId?: string): Promise<CategoryImage[]> {
  try {
    const url = categoryId
      ? `${MEDUSA_BACKEND_URL}/store/category-images?category_id=${categoryId}`
      : `${MEDUSA_BACKEND_URL}/store/category-images`;
    
    const response = await fetch(url, {
      next: { tags: ["category-images"] },
    });
    
    if (!response.ok) {
      console.error("Failed to fetch category images:", response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error("Error fetching category images:", error);
    return [];
  }
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

    // Fetch all category images (default to true, can be disabled with includeImages: false)
    let categoryImagesMap: Record<string, CategoryImage[]> = {};
    if (options.includeImages !== false) {
      try {
        const allImages = await fetchCategoryImages();
        categoryImagesMap = allImages.reduce((acc, image) => {
          if (image.category_id) {
            if (!acc[image.category_id]) {
              acc[image.category_id] = [];
            }
            acc[image.category_id].push(image);
          }
          return acc;
        }, {} as Record<string, CategoryImage[]>);
      } catch (error) {
        // Silently fail if images can't be fetched - categories will still work without images
        console.warn("Failed to fetch category images:", error);
      }
    }

    return product_categories.map((category: StoreProductCategory) =>
      transformMedusaCategory(category, categoryImagesMap[category.id])
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

    // Fetch category images (default to true, can be disabled with includeImages: false)
    let categoryImages: CategoryImage[] = [];
    if (options.includeImages !== false) {
      try {
        categoryImages = await fetchCategoryImages(id);
      } catch (error) {
        // Silently fail if images can't be fetched - category will still work without images
        console.warn(`Failed to fetch images for category ${id}:`, error);
      }
    }

    return transformMedusaCategory(product_category as StoreProductCategory, categoryImages);
  } catch (error) {
    console.error("Error fetching category from MedusaJS:", error);
    return null;
  }
}

/**
 * Transform MedusaJS category to match your current category structure
 */
function transformMedusaCategory(
  medusaCategory: StoreProductCategory,
  images: CategoryImage[] = []
): Category {
  const category = medusaCategory as StoreProductCategory & {
    is_active?: boolean;
    created_at?: string;
    updated_at?: string;
  };
  
  // Handle parent_category_id which can be string | null in StoreProductCategory
  const parentId = medusaCategory.parent_category_id ?? "";
  
  // Get thumbnail image (prefer thumbnail type, fallback to first image)
  const thumbnailImage = images.find((img) => img.type === "thumbnail") || images[0];
  const imageUrl = thumbnailImage?.url || (medusaCategory.metadata?.image as string) || "";
  
  return {
    id: medusaCategory.id,
    _id: medusaCategory.id,
    name: medusaCategory.name || "",
    slug: medusaCategory.handle || "",
    description: medusaCategory.description || "",
    icon: (medusaCategory.metadata?.icon as string) || "",
    image: imageUrl,
    images: images,
    status: category.is_active ? "show" : "hide",
    parent: parentId,
    children: medusaCategory.category_children?.map((child) =>
      transformMedusaCategory(child, [])
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


