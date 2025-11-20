/**
 * Migration Runner Script
 * 
 * This script runs the full migration from MongoDB exported data to MedusaJS.
 * 
 * Prerequisites:
 * 1. Run export-mongodb.ts to export data from MongoDB
 * 2. Ensure Medusa backend is running
 * 3. Ensure PostgreSQL database is set up
 * 4. Ensure at least one region exists in Medusa
 * 
 * Usage as Medusa CLI script:
 *   npx medusa exec ./src/migration-scripts/run-migration.ts
 * 
 * Or with specific data files:
 *   npx medusa exec ./src/migration-scripts/run-migration.ts --categories=./data-export/categories.json
 */

import fs from "fs/promises";
import path from "path";
import { ExecArgs } from "@medusajs/framework/types";
import { runFullMigration, type MongoCategory, type MongoBrand, type MongoProduct, type MongoCustomer } from "./index";
import { getLogger } from "./logger";

// Default data file paths
const DATA_DIR = path.join(__dirname, "../data-export");
const DEFAULT_CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const DEFAULT_BRANDS_FILE = path.join(DATA_DIR, "brands.json");
const DEFAULT_PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const DEFAULT_CUSTOMERS_FILE = path.join(DATA_DIR, "customers.json");

/**
 * Load JSON data from file
 */
async function loadJsonData<T>(filePath: string, logger: ReturnType<typeof getLogger>): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      logger.warn(`⚠️  File not found: ${filePath}`);
      return [];
    }
    throw error;
  }
}

/**
 * Validate required data
 */
function validateData(
  data: {
    categories: MongoCategory[];
    brands: MongoBrand[];
    products: MongoProduct[];
    customers: MongoCustomer[];
  },
  logger: ReturnType<typeof getLogger>
): void {
  const errors: string[] = [];

  if (data.categories.length === 0) {
    errors.push("No categories found. Categories are required for product migration.");
  }

  if (data.products.length === 0) {
    logger.warn("⚠️  No products found. Product migration will be skipped.");
  }

  // Validate products have required fields
  for (const product of data.products) {
    if (!product.name) {
      errors.push(`Product missing name: ${JSON.stringify(product).substring(0, 50)}`);
    }
    if (!product.prices?.price || product.prices.price <= 0) {
      errors.push(`Product "${product.name}" has invalid price: ${product.prices?.price}`);
    }
  }

  if (errors.length > 0) {
    logger.error("\n❌ Validation errors:");
    errors.forEach((error) => logger.error(`  - ${error}`));
    throw new Error("Data validation failed");
  }
}

/**
 * Main migration runner - Medusa CLI script
 */
export default async function runMigration({ container, args }: ExecArgs): Promise<void> {
  const logger = getLogger(container);
  logger.info("=".repeat(60));
  logger.info("MedusaJS Migration Runner");
  logger.info("=".repeat(60));

  // Parse command line arguments
  const scriptArgs = args || [];
  const categoriesFile = scriptArgs.find((arg: string) => arg.startsWith("--categories="))?.split("=")[1] || DEFAULT_CATEGORIES_FILE;
  const brandsFile = scriptArgs.find((arg: string) => arg.startsWith("--brands="))?.split("=")[1] || DEFAULT_BRANDS_FILE;
  const productsFile = scriptArgs.find((arg: string) => arg.startsWith("--products="))?.split("=")[1] || DEFAULT_PRODUCTS_FILE;
  const customersFile = scriptArgs.find((arg: string) => arg.startsWith("--customers="))?.split("=")[1] || DEFAULT_CUSTOMERS_FILE;

  try {
    // Load data from JSON files
    logger.info("\n📂 Loading data from JSON files...");
    const [categories, brands, products, customers] = await Promise.all([
      loadJsonData<MongoCategory>(categoriesFile, logger),
      loadJsonData<MongoBrand>(brandsFile, logger),
      loadJsonData<MongoProduct>(productsFile, logger),
      loadJsonData<MongoCustomer>(customersFile, logger),
    ]);

    logger.info(`✓ Loaded ${categories.length} categories`);
    logger.info(`✓ Loaded ${brands.length} brands`);
    logger.info(`✓ Loaded ${products.length} products`);
    logger.info(`✓ Loaded ${customers.length} customers`);

    // Validate data
    logger.info("\n🔍 Validating data...");
    validateData({ categories, brands, products, customers }, logger);
    logger.info("✓ Data validation passed");

    // Run migration using workflows
    logger.info("\n🚀 Starting migration...");
    const summary = await runFullMigration({
      categories,
      brands,
      products,
      customers,
      blogs: [],
      coupons: [],
      themes: [],
    }, container);

    // Print final summary
    logger.info("\n" + "=".repeat(60));
    logger.info("✅ Migration Complete!");
    logger.info("=".repeat(60));
    logger.info(`\nTotal migrated: ${summary.totalSuccess} items`);
    logger.info(`Total failed: ${summary.totalFailed} items`);

    if (summary.totalFailed > 0) {
      logger.warn("\n⚠️  Some items failed to migrate. Review the errors above.");
      throw new Error("Migration completed with errors");
    } else {
      logger.info("\n✅ All items migrated successfully!");
    }
  } catch (error) {
    logger.error("\n❌ Migration failed:", error);
    throw error;
  }
}

