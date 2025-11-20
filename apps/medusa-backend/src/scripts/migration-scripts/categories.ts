/**
 * Category Migration Script
 * Migrates categories from MongoDB to MedusaJS using workflows
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { createProductCategoriesWorkflow } from "@medusajs/medusa/core-flows";
import { getLogger } from "./logger";
import type { CreateProductCategoryDTO } from "@medusajs/types";
export interface MongoCategory {
  _id?: string;
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  icon?: string;
  image?: string;
  status?: "show" | "hide";
  parent?: string;
  theme?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface MigrationResult {
  success: number;
  failed: number;
  errors: string[];
  categoryMap: Map<string, string>; // Maps old MongoDB ID to new Medusa ID
}

/**
 * Transform MongoDB category to MedusaJS format
 */
function transformCategory(
  mongoCategory: MongoCategory,
  parentCategoryMap: Map<string, string>
): CreateProductCategoryDTO {
  return {
    name: mongoCategory.name,
    handle: mongoCategory.slug || mongoCategory.name.toLowerCase().replace(/\s+/g, "-"),
    description: mongoCategory.description || "",
    is_active: mongoCategory.status === "show",
    parent_category_id: mongoCategory.parent
      ? parentCategoryMap.get(mongoCategory.parent)
      : null,
    metadata: {
        icon: mongoCategory.icon || "",
      image: mongoCategory.image || "",
      theme: mongoCategory.theme || [],
    },
  };
}

/**
 * Migrate categories from MongoDB to MedusaJS using workflows
 * Categories must be migrated in order: parents before children
 */
export async function migrateCategories(
  mongoCategories: MongoCategory[],
  container: MedusaContainer
): Promise<MigrationResult> {
  const logger = getLogger(container);
  let success = 0;
  let failed = 0;
  const errors: string[] = [];
  const categoryMap = new Map<string, string>(); // old ID -> new ID

  logger.info(`Starting migration of ${mongoCategories.length} categories...`);

  // Separate parents and children
  const parentCategories = mongoCategories.filter((cat) => !cat.parent);
  const childCategories = mongoCategories.filter((cat) => cat.parent);

  // First, migrate all parent categories
  logger.info(`\nMigrating ${parentCategories.length} parent categories...`);
  for (const mongoCategory of parentCategories) {
    try {
      const categoryData = transformCategory(mongoCategory, categoryMap);
      const { result } = await createProductCategoriesWorkflow(container).run({
        input: {
          product_categories: [categoryData],
        },
      });
      
      if (result?.[0]?.id && mongoCategory.id) {
        categoryMap.set(mongoCategory.id, result[0].id);
      }
      
      success++;
      logger.info(`✓ Migrated category: ${mongoCategory.name}`);
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate category ${mongoCategory.name}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  // Then, migrate all child categories
  logger.info(`\nMigrating ${childCategories.length} child categories...`);
  for (const mongoCategory of childCategories) {
    try {
      const categoryData = transformCategory(mongoCategory, categoryMap);
      const { result } = await createProductCategoriesWorkflow(container).run({
        input: {
          product_categories: [categoryData],
        },
      });
      
      if (result?.[0]?.id && mongoCategory.id) {
        categoryMap.set(mongoCategory.id, result[0].id);
      }
      
      success++;
      logger.info(`✓ Migrated category: ${mongoCategory.name}`);
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate category ${mongoCategory.name}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  logger.info(`\nCategory migration complete:`);
  logger.info(`  Success: ${success}`);
  logger.info(`  Failed: ${failed}`);
  if (errors.length > 0) {
    logger.info(`\nErrors:`);
    errors.forEach((error) => logger.info(`  - ${error}`));
  }

  return { success, failed, errors, categoryMap };
}

