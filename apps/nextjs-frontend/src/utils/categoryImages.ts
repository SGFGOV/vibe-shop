import type { Category, CategoryImage } from "@/types";

/**
 * Get the thumbnail image URL for a category
 * Falls back to the first image, then to the category.image property, then to icon
 */
export function getCategoryThumbnail(category: Category): string {
  if (category.images && category.images.length > 0) {
    const thumbnail = category.images.find((img) => img.type === "thumbnail");
    if (thumbnail) return thumbnail.url;
    return category.images[0].url;
  }
  return category.image || category.icon || "";
}

/**
 * Get all banner images (non-thumbnail images) for a category
 */
export function getCategoryBanners(category: Category): CategoryImage[] {
  if (!category.images) return [];
  return category.images.filter((img) => img.type === "image");
}

/**
 * Get the first banner image URL for a category
 */
export function getCategoryBanner(category: Category): string {
  const banners = getCategoryBanners(category);
  return banners.length > 0 ? banners[0].url : "";
}

/**
 * Get all images for a category (both thumbnail and banners)
 */
export function getCategoryImages(category: Category): CategoryImage[] {
  return category.images || [];
}

/**
 * Check if a category has images
 */
export function hasCategoryImages(category: Category): boolean {
  return !!(category.images && category.images.length > 0);
}

