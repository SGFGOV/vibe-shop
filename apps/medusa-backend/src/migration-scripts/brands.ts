/**
 * Brand Migration Script
 * Migrates brands from MongoDB to MedusaJS Brand module
 */

import BrandModuleService from "../modules/brand/service"
import { BRAND_MODULE } from "../modules/brand"
import { MedusaContainer } from "@medusajs/framework/types"
import { getLogger } from "./logger"

export interface MongoBrand {
  _id?: string
  id?: string
  name: string
  icon: string
  status?: "show" | "hide"
  createdAt?: Date
  updatedAt?: Date
}

/**
 * Transform MongoDB brand to MedusaJS format
 */
function transformBrand(mongoBrand: MongoBrand) {
  return {
    name: mongoBrand.name,
    icon: mongoBrand.icon,
    status: mongoBrand.status || "show",
  }
}

/**
 * Migrate brands from MongoDB to MedusaJS
 */
export async function migrateBrands(
  brandService: BrandModuleService,
  mongoBrands: MongoBrand[],
  container: MedusaContainer
): Promise<{ success: number; failed: number; errors: string[] }> {
  const logger = getLogger(container);
  let success = 0
  let failed = 0
  const errors: string[] = []

  logger.info(`Starting migration of ${mongoBrands.length} brands...`)

  for (const mongoBrand of mongoBrands) {
    try {
      const brandData = transformBrand(mongoBrand)
      await brandService.createBrands(brandData)
      success++
      logger.info(`✓ Migrated brand: ${mongoBrand.name}`)
    } catch (error) {
      failed++
      const errorMessage = `Failed to migrate brand ${mongoBrand.name}: ${error}`
      errors.push(errorMessage)
      logger.error(`✗ ${errorMessage}`)
    }
  }

  logger.info(`\nMigration complete:`)
  logger.info(`  Success: ${success}`)
  logger.info(`  Failed: ${failed}`)
  if (errors.length > 0) {
    logger.info(`\nErrors:`)
    errors.forEach((error) => logger.info(`  - ${error}`))
  }

  return { success, failed, errors }
}

/**
 * Main migration function
 * Usage: Import and call with container and MongoDB brands
 */
export async function runBrandMigration(
  container: MedusaContainer,
  mongoBrands: MongoBrand[]
): Promise<void> {
  const logger = getLogger(container);
  try {
    const brandService:BrandModuleService = container.resolve(BRAND_MODULE)
    await migrateBrands(brandService, mongoBrands, container)
  } catch (error) {
    logger.error(`Migration failed: ${error}`)
    throw error
  }
}
