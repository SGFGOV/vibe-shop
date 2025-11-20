/**
 * Seed Database Script
 * 
 * This script seeds the MedusaJS database with data from the seed-data directory.
 * It imports all seed data and runs the full migration.
 * 
 * Usage as Medusa CLI script:
 *   npx medusa exec ./src/migration-scripts/seed.ts
 */

import { ExecArgs } from "@medusajs/framework/types";
import { runFullMigration } from "./index";
import { allCategories } from "./seed-data/categories";
import { allBrands } from "./seed-data/brands";
import { allProducts } from "./seed-data/products";
import { allCustomers } from "./seed-data/customers";
import { allBlogs } from "./seed-data/blogs";
import { allCoupons } from "./seed-data/coupons";
import { allThemes } from "./seed-data/themes";
import type { MongoCategory, MongoBrand, MongoProduct, MongoCustomer, MongoBlog, MongoCoupon, MongoTheme } from "./index";
import { getLogger } from "./logger";

/**
 * Main seed runner - Medusa CLI script
 */
export default async function seedDatabase({ container }: ExecArgs): Promise<void> {
  const logger = getLogger(container);
  
  logger.info("=".repeat(60));
  logger.info("Database Seeding from Seed Data");
  logger.info("=".repeat(60));
  logger.info(`Categories: ${allCategories.length}`);
  logger.info(`Brands: ${allBrands.length}`);
  logger.info(`Products: ${allProducts.length}`);
  logger.info(`Customers: ${allCustomers.length}`);
  logger.info(`Blogs: ${allBlogs.length}`);
  logger.info(`Coupons: ${allCoupons.length}`);
  logger.info(`Themes: ${allThemes.length}`);
  logger.info("=".repeat(60));

  try {
    // Prepare data for migration
    const mongoData = {
      categories: allCategories.map((cat) => ({
        ...cat,
        id: cat.id || cat._id || "",
      })) as MongoCategory[],
      brands: allBrands.map((brand) => ({
        ...brand,
        id: brand.id || brand._id || "",
      })) as MongoBrand[],
      products: allProducts.map((product) => ({
        ...product,
        id: product.id || product._id || "",
      })) as MongoProduct[],
      customers: allCustomers.map((customer) => ({
        ...customer,
        id: customer.id || customer._id || "",
      })) as MongoCustomer[],
      blogs: allBlogs.map((blog) => ({
        ...blog,
        id: blog.id || blog._id || "",
      })) as MongoBlog[],
      coupons: allCoupons.map((coupon) => ({
        ...coupon,
        id: coupon.id || coupon._id || "",
      })) as MongoCoupon[],
      themes: allThemes.map((theme) => ({
        ...theme,
        id: theme.id || theme._id || "",
      })) as MongoTheme[],
    };

    // Run full migration
    const summary = await runFullMigration(mongoData, container);

    logger.info("\n" + "=".repeat(60));
    logger.info("✅ SEEDING COMPLETE");
    logger.info("=".repeat(60));
    logger.info(`Total Success: ${summary.totalSuccess}`);
    logger.info(`Total Failed: ${summary.totalFailed}`);
    logger.info("=".repeat(60));

    if (summary.totalFailed > 0) {
      logger.warn("\n⚠️  Some items failed to seed. Review the errors above.");
      throw new Error("Seeding completed with errors");
    } else {
      logger.info("\n✅ All items seeded successfully!");
    }
  } catch (error) {
    logger.error("\n" + "=".repeat(60));
    logger.error("❌ SEEDING FAILED");
    logger.error("=".repeat(60));
    logger.error(error);
    throw error;
  }
}

