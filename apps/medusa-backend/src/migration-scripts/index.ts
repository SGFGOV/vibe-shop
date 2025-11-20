/**
 * Main Migration Script Runner
 * Orchestrates the migration of all data from MongoDB to MedusaJS using workflows
 * 
 * Usage:
 *   import { runFullMigration } from "./migration-scripts"
 *   await runFullMigration(mongoData, container)
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { getLogger } from "./logger";
import { migrateCategories, type MongoCategory } from "./categories";
import { migrateBrands, type MongoBrand } from "./brands";
import { migrateProducts, type MongoProduct } from "./products";
import { migrateCustomers, type MongoCustomer } from "./customers";
import { migrateBlogs, type MongoBlog } from "./blogs";
import { migrateCoupons, type MongoCoupon } from "./coupons";
import { migrateThemes, type MongoTheme } from "./themes";
import { BRAND_MODULE } from "../modules/brand";
import BrandModuleService from "../modules/brand/service";

interface MongoData {
  categories: MongoCategory[];
  brands: MongoBrand[];
  products: MongoProduct[];
  customers: MongoCustomer[];
  blogs: MongoBlog[];
  coupons: MongoCoupon[];
  themes: MongoTheme[];
}

interface MigrationSummary {
  categories: { success: number; failed: number };
  brands: { success: number; failed: number };
  products: { success: number; failed: number };
  customers: { success: number; failed: number };
  blogs: { success: number; failed: number };
  coupons: { success: number; failed: number };
  themes: { success: number; failed: number };
  totalSuccess: number;
  totalFailed: number;
}

/**
 * Run full migration in correct order using workflows
 * Order: Categories → Brands → Products → Customers
 */
export async function runFullMigration(
  mongoData: MongoData,
  container: MedusaContainer
): Promise<MigrationSummary> {
  const logger = getLogger(container);
  logger.info("=".repeat(60));
  logger.info("Starting Full Migration from MongoDB to MedusaJS");
  logger.info("=".repeat(60));

  const summary: MigrationSummary = {
    categories: { success: 0, failed: 0 },
    brands: { success: 0, failed: 0 },
    products: { success: 0, failed: 0 },
    customers: { success: 0, failed: 0 },
    blogs: { success: 0, failed: 0 },
    coupons: { success: 0, failed: 0 },
    themes: { success: 0, failed: 0 },
    totalSuccess: 0,
    totalFailed: 0,
  };

  try {
    // Step 1: Migrate Categories (parents before children)
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 1: Migrating Categories");
    logger.info("=".repeat(60));
    const categoryResult = await migrateCategories(mongoData.categories, container);
    summary.categories = {
      success: categoryResult.success,
      failed: categoryResult.failed,
    };
    summary.totalSuccess += categoryResult.success;
    summary.totalFailed += categoryResult.failed;

    // Step 2: Migrate Brands
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 2: Migrating Brands");
    logger.info("=".repeat(60));
    const brandService = container.resolve<BrandModuleService>(BRAND_MODULE);
    const brandResult = await migrateBrands(brandService, mongoData.brands, container);
    summary.brands = {
      success: brandResult.success,
      failed: brandResult.failed,
    };
    summary.totalSuccess += brandResult.success;
    summary.totalFailed += brandResult.failed;

    // Step 3: Migrate Products (depends on categories)
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 3: Migrating Products");
    logger.info("=".repeat(60));
    // Note: Region ID is optional - if not provided, prices will be currency-based only
    // You can get region ID from the region service if needed
    const regionId: string | undefined = undefined;

    // Build category name map (category name -> Medusa category ID)
    // This is needed because products reference categories by name, not ID
    const categoryNameMap = new Map<string, string>();
    for (const category of mongoData.categories) {
      const medusaId = categoryResult.categoryMap.get(category.id || category._id || "");
      if (medusaId && category.name) {
        categoryNameMap.set(category.name, medusaId);
      }
    }

    const productResult = await migrateProducts(
      mongoData.products,
      categoryResult.categoryMap,
      categoryNameMap,
      container,
      regionId
    );
    summary.products = {
      success: productResult.success,
      failed: productResult.failed,
    };
    summary.totalSuccess += productResult.success;
    summary.totalFailed += productResult.failed;

    // Step 4: Migrate Customers
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 4: Migrating Customers");
    logger.info("=".repeat(60));
    const customerResult = await migrateCustomers(mongoData.customers, container);
    summary.customers = {
      success: customerResult.success,
      failed: customerResult.failed,
    };
    summary.totalSuccess += customerResult.success;
    summary.totalFailed += customerResult.failed;

    // Step 5: Migrate Blogs
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 5: Migrating Blogs");
    logger.info("=".repeat(60));
    const blogResult = await migrateBlogs(mongoData.blogs, container);
    summary.blogs = {
      success: blogResult.success,
      failed: blogResult.failed,
    };
    summary.totalSuccess += blogResult.success;
    summary.totalFailed += blogResult.failed;

    // Step 6: Migrate Coupons (Promotions)
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 6: Migrating Coupons (Promotions)");
    logger.info("=".repeat(60));
    const couponResult = await migrateCoupons(mongoData.coupons, container);
    summary.coupons = {
      success: couponResult.success,
      failed: couponResult.failed,
    };
    summary.totalSuccess += couponResult.success;
    summary.totalFailed += couponResult.failed;

    // Step 7: Migrate Themes
    logger.info("\n" + "=".repeat(60));
    logger.info("STEP 7: Migrating Themes");
    logger.info("=".repeat(60));
    const themeResult = await migrateThemes(mongoData.themes, container);
    summary.themes = {
      success: themeResult.success,
      failed: themeResult.failed,
    };
    summary.totalSuccess += themeResult.success;
    summary.totalFailed += themeResult.failed;

    // Final Summary
    logger.info("\n" + "=".repeat(60));
    logger.info("MIGRATION SUMMARY");
    logger.info("=".repeat(60));
    logger.info(`Categories: ${summary.categories.success} success, ${summary.categories.failed} failed`);
    logger.info(`Brands: ${summary.brands.success} success, ${summary.brands.failed} failed`);
    logger.info(`Products: ${summary.products.success} success, ${summary.products.failed} failed`);
    logger.info(`Customers: ${summary.customers.success} success, ${summary.customers.failed} failed`);
    logger.info(`Blogs: ${summary.blogs.success} success, ${summary.blogs.failed} failed`);
    logger.info(`Coupons: ${summary.coupons.success} success, ${summary.coupons.failed} failed`);
    logger.info(`Themes: ${summary.themes.success} success, ${summary.themes.failed} failed`);
    logger.info(`\nTotal: ${summary.totalSuccess} success, ${summary.totalFailed} failed`);
    logger.info("=".repeat(60));

    return summary;
  } catch (error) {
    logger.error("\nMigration failed with error:", error);
    throw error;
  }
}

/**
 * Export individual migration functions for selective migration
 */
export { migrateCategories, migrateBrands, migrateProducts, migrateCustomers, migrateBlogs, migrateCoupons, migrateThemes };
export type { MongoCategory, MongoBrand, MongoProduct, MongoCustomer, MongoBlog, MongoCoupon, MongoTheme };

