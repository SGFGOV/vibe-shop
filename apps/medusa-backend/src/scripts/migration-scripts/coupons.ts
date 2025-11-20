/**
 * Coupon/Promotion Migration Script
 * Migrates coupons from MongoDB to MedusaJS using the Promotion module
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { createPromotionsWorkflow } from "@medusajs/medusa/core-flows";
import { getLogger } from "./logger";

export interface MongoCoupon {
  _id?: string;
  id?: string;
  title: string;
  couponCode: string;
  discountPercentage: number;
  endTime?: string | Date;
  bannerImage?: string;
  status?: "show" | "hide";
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface MigrationResult {
  success: number;
  failed: number;
  errors: string[];
}

/**
 * Transform MongoDB coupon to MedusaJS promotion format
 */
function transformCoupon(mongoCoupon: MongoCoupon) {
  // Convert discount percentage to Medusa format
  // Medusa uses value as the discount amount (10 = 10%)
  const discountValue = mongoCoupon.discountPercentage || 0;

  // Determine end date
  let endsAt: Date | undefined;
  if (mongoCoupon.endTime) {
    endsAt = mongoCoupon.endTime instanceof Date 
      ? mongoCoupon.endTime 
      : new Date(mongoCoupon.endTime);
  }

  const promotionData: {
    code: string;
    type: "standard";
    status: "active" | "draft";
    application_method: {
      type: "percentage";
      target_type: "order";
      allocation: "across";
      value: number;
      currency_code: string;
    };
    campaign?: {
      name: string;
      campaign_identifier: string;
      ends_at: Date;
    };
    metadata: {
      title: string;
      bannerImage: string;
      mongoId?: string;
    };
  } = {
    code: mongoCoupon.couponCode,
    type: "standard",
    status: mongoCoupon.status === "show" ? "active" : "draft",
    application_method: {
      type: "percentage",
      target_type: "order",
      allocation: "across",
      value: discountValue,
      currency_code: "usd",
    },
    metadata: {
      title: mongoCoupon.title,
      bannerImage: mongoCoupon.bannerImage || "",
      mongoId: mongoCoupon._id || mongoCoupon.id,
    },
  };

  // Add campaign if end date is provided
  if (endsAt) {
    promotionData.campaign = {
      name: mongoCoupon.title,
      campaign_identifier: mongoCoupon.couponCode,
      ends_at: endsAt,
    };
  }

  return promotionData;
}

/**
 * Migrate coupons from MongoDB to MedusaJS using workflows
 */
export async function migrateCoupons(
  mongoCoupons: MongoCoupon[],
  container: MedusaContainer
): Promise<MigrationResult> {
  const logger = getLogger(container);
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  logger.info(`Starting migration of ${mongoCoupons.length} coupons...`);

  for (const mongoCoupon of mongoCoupons) {
    try {
      // Validate coupon has required fields
      if (!mongoCoupon.couponCode) {
        throw new Error(`Coupon ${mongoCoupon.title} has no coupon code`);
      }

      if (!mongoCoupon.discountPercentage || mongoCoupon.discountPercentage <= 0) {
        throw new Error(
          `Coupon ${mongoCoupon.title} has invalid discount percentage: ${mongoCoupon.discountPercentage}`
        );
      }

      // Transform coupon data
      const promotionData = transformCoupon(mongoCoupon);

      // Create promotion using workflow
      const { result } = await createPromotionsWorkflow(container).run({
        input: {
          promotionsData: [promotionData],
        },
      });

      success++;
      logger.info(`✓ Migrated coupon: ${mongoCoupon.couponCode} (${mongoCoupon.discountPercentage}% off)`);
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate coupon ${mongoCoupon.couponCode}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  logger.info(`\nCoupon migration complete:`);
  logger.info(`  Success: ${success}`);
  logger.info(`  Failed: ${failed}`);
  if (errors.length > 0) {
    logger.info(`\nErrors:`);
    errors.forEach((error) => logger.info(`  - ${error}`));
  }

  return { success, failed, errors };
}

