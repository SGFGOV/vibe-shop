"use client";

import Image from "next/image";
import { Category } from "@/types";
import { getCategoryBanner, hasCategoryImages } from "@/utils/categoryImages";

interface CategoryBannerProps {
  category: Category;
  className?: string;
}

/**
 * Category Banner Component
 * Displays the first banner image (non-thumbnail) for a category
 * Falls back to thumbnail if no banner exists
 */
export default function CategoryBanner({ category, className = "" }: CategoryBannerProps) {
  if (!hasCategoryImages(category)) {
    return null;
  }

  const bannerUrl = getCategoryBanner(category);
  
  // If no banner, try to use thumbnail
  const imageUrl = bannerUrl || category.image || "";

  if (!imageUrl) {
    return null;
  }

  return (
    <div className={`relative w-full h-64 md:h-80 lg:h-96 mb-8 overflow-hidden ${className}`}>
      <Image
        src={imageUrl}
        alt={category.name}
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />
    </div>
  );
}

