/**
 * Coupon Controller - Uses MedusaJS Discounts/Promotions
 * Read-only: Coupons are managed via Medusa Admin
 * This controller provides backward compatibility for reading discounts
 */

import { sdk } from "../../../lib/sdk";
import type { Coupon } from "@/types";
import type { AdminPromotion } from "@medusajs/types";

/**
 * Transform MedusaJS promotion to Coupon format
 */
function transformPromotionToCoupon(promotion: AdminPromotion): Coupon {
  const promotionData = promotion as AdminPromotion & {
    code?: string;
    application_method?: {
      type?: string;
      value?: number;
    };
    campaign?: {
      ends_at?: string;
    };
    status?: string;
    created_at?: string;
    updated_at?: string;
  };
  
  const discountValue = promotionData.application_method?.value || 0;
  const discountType = promotionData.application_method?.type || "fixed";
  
  return {
    id: promotion.id,
    _id: promotion.id,
    code: promotionData.code || "",
    discount: discountType === "percentage" ? discountValue : discountValue / 100,
    discountType: discountType === "percentage" ? "percentage" : "fixed",
    validUntil: promotionData.campaign?.ends_at 
      ? new Date(promotionData.campaign.ends_at) 
      : undefined,
    status: promotionData.status === "active" ? "show" : "hide",
    createdAt: promotionData.created_at ? new Date(promotionData.created_at) : undefined,
    updatedAt: promotionData.updated_at ? new Date(promotionData.updated_at) : undefined,
  } as Coupon;
}

/**
 * Get all coupons (discounts/promotions) using MedusaJS
 * Read-only: Coupons are managed via Medusa Admin
 * Note: Store API doesn't have a list promotions endpoint
 * This requires admin access or custom implementation
 */
export async function getAllCoupons(): Promise<Coupon[]> {
  try {
    // Note: Store API doesn't have a list promotions endpoint
    // Promotions/discounts are typically applied via cart operations
    // For listing all promotions, use Medusa Admin
    console.warn("getAllCoupons: Promotion listing requires admin access. Use Medusa Admin.");
    return [];
  } catch (error) {
    console.error("Error fetching coupons from MedusaJS:", error);
    return [];
  }
}

