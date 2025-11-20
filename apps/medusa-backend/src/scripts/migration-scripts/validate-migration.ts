/**
 * Migration Validation Script
 * 
 * This script validates that the migration was successful by comparing
 * data counts and spot-checking data integrity.
 * 
 * Usage as Medusa CLI script:
 *   npx medusa exec ./src/migration-scripts/validate-migration.ts
 */

import fs from "fs/promises";
import path from "path";

import { ExecArgs, MedusaContainer } from "@medusajs/framework/types";
import { Modules } from "@medusajs/framework/utils";
import { getLogger } from "./logger";

const DATA_DIR = path.join(__dirname, "../data-export");
const CATEGORIES_FILE = path.join(DATA_DIR, "categories.json");
const BRANDS_FILE = path.join(DATA_DIR, "brands.json");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const CUSTOMERS_FILE = path.join(DATA_DIR, "customers.json");

interface ValidationResult {
  passed: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Load JSON data from file
 */
async function loadJsonData<T>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data) as T[];
  } catch (error) {
    return [];
  }
}

/**
 * Validate categories migration
 */
async function validateCategories(
  originalCount: number,
  container: MedusaContainer,
  logger: ReturnType<typeof getLogger>
): Promise<ValidationResult> {
  const result: ValidationResult = { passed: true, errors: [], warnings: [] };

  try {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const categories = await productModuleService.listProductCategories({});
    const migratedCount = categories?.length || 0;

    if (migratedCount < originalCount) {
      result.passed = false;
      result.errors.push(
        `Categories: Expected ${originalCount}, found ${migratedCount} (missing ${originalCount - migratedCount})`
      );
    } else if (migratedCount > originalCount) {
      result.warnings.push(
        `Categories: Found ${migratedCount}, expected ${originalCount} (${migratedCount - originalCount} extra)`
      );
    } else {
      logger.info(`✓ Categories: ${migratedCount} migrated (matches original)`);
    }
  } catch (error) {
    result.passed = false;
    result.errors.push(`Failed to validate categories: ${error}`);
  }

  return result;
}

/**
 * Validate products migration
 */
async function validateProducts(
  originalCount: number,
  container: MedusaContainer,
  logger: ReturnType<typeof getLogger>
): Promise<ValidationResult> {
  const result: ValidationResult = { passed: true, errors: [], warnings: [] };

  try {
    const productModuleService = container.resolve(Modules.PRODUCT);
    const products = await productModuleService.listProducts({});
    const migratedCount = products?.length || 0;

    if (migratedCount < originalCount) {
      result.passed = false;
      result.errors.push(
        `Products: Expected ${originalCount}, found ${migratedCount} (missing ${originalCount - migratedCount})`
      );
    } else if (migratedCount > originalCount) {
      result.warnings.push(
        `Products: Found ${migratedCount}, expected ${originalCount} (${migratedCount - originalCount} extra)`
      );
    } else {
      logger.info(`✓ Products: ${migratedCount} migrated (matches original)`);
    }

    // Validate that products have variants with prices
    // Note: Prices are stored separately in the pricing module, not directly on variants
    // This validation checks for variants existence only
    if (products && products.length > 0) {
      const productsWithoutVariants = products.filter((p) => !p.variants || p.variants.length === 0);
      if (productsWithoutVariants.length > 0) {
        result.errors.push(
          `Found ${productsWithoutVariants.length} products without variants (all products must have at least one variant)`
        );
        result.passed = false;
      } else {
        logger.info(`✓ All products have variants`);
      }
    }
  } catch (error) {
    result.passed = false;
    result.errors.push(`Failed to validate products: ${error}`);
  }

  return result;
}

/**
 * Validate customers migration
 */
async function validateCustomers(
  originalCount: number,
  container: MedusaContainer,
  logger: ReturnType<typeof getLogger>
): Promise<ValidationResult> {
  const result: ValidationResult = { passed: true, errors: [], warnings: [] };

  try {
    const customerModuleService = container.resolve(Modules.CUSTOMER);
    const customers = await customerModuleService.listCustomers({});
    const migratedCount = customers?.length || 0;

    if (migratedCount < originalCount) {
      result.passed = false;
      result.errors.push(
        `Customers: Expected ${originalCount}, found ${migratedCount} (missing ${originalCount - migratedCount})`
      );
    } else if (migratedCount > originalCount) {
      result.warnings.push(
        `Customers: Found ${migratedCount}, expected ${originalCount} (${migratedCount - originalCount} extra)`
      );
    } else {
      logger.info(`✓ Customers: ${migratedCount} migrated (matches original)`);
    }
  } catch (error) {
    result.passed = false;
    result.errors.push(`Failed to validate customers: ${error}`);
  }

  return result;
}

/**
 * Main validation function - Medusa CLI script
 */
export default async function validateMigration({ container }: ExecArgs): Promise<void> {
  const logger = getLogger(container);
  logger.info("=".repeat(60));
  logger.info("Migration Validation");
  logger.info("=".repeat(60));

  try {
    // Load original data counts
    logger.info("\n📂 Loading original data counts...");
    const [originalCategories, originalBrands, originalProducts, originalCustomers] = await Promise.all([
      loadJsonData(CATEGORIES_FILE),
      loadJsonData(BRANDS_FILE),
      loadJsonData(PRODUCTS_FILE),
      loadJsonData(CUSTOMERS_FILE),
    ]);

    logger.info(`Original counts:`);
    logger.info(`  Categories: ${originalCategories.length}`);
    logger.info(`  Brands: ${originalBrands.length}`);
    logger.info(`  Products: ${originalProducts.length}`);
    logger.info(`  Customers: ${originalCustomers.length}`);

    // Validate each entity type
    logger.info("\n🔍 Validating migrated data...");
    const [categoriesResult, productsResult, customersResult] = await Promise.all([
      validateCategories(originalCategories.length, container, logger),
      validateProducts(originalProducts.length, container, logger),
      validateCustomers(originalCustomers.length, container, logger),
    ]);

    // Collect all results
    const allErrors: string[] = [
      ...categoriesResult.errors,
      ...productsResult.errors,
      ...customersResult.errors,
    ];
    const allWarnings: string[] = [
      ...categoriesResult.warnings,
      ...productsResult.warnings,
      ...customersResult.warnings,
    ];

    // Print results
    logger.info("\n" + "=".repeat(60));
    if (allErrors.length === 0) {
      logger.info("✅ Validation Passed!");
      if (allWarnings.length > 0) {
        logger.warn("\n⚠️  Warnings:");
        allWarnings.forEach((warning) => logger.warn(`  - ${warning}`));
      }
    } else {
      logger.error("❌ Validation Failed!");
      logger.error("\nErrors:");
      allErrors.forEach((error) => logger.error(`  - ${error}`));
      if (allWarnings.length > 0) {
        logger.warn("\n⚠️  Warnings:");
        allWarnings.forEach((warning) => logger.warn(`  - ${warning}`));
      }
      throw new Error("Validation failed");
    }
    logger.info("=".repeat(60));
  } catch (error) {
    logger.error("\n❌ Validation failed:", error);
    throw error;
  }
}

