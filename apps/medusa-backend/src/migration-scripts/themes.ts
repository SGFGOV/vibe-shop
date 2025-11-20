/**
 * Theme Migration Script
 * Migrates theme settings from MongoDB to MedusaJS using the Theme module
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { getLogger } from "./logger";
import { THEME_MODULE } from "../modules/theme";
import ThemeModuleService from "../modules/theme/service";

export interface MongoTheme {
  _id?: string;
  id?: string;
  name: string;
  setting: Record<string, unknown>;
  is_active?: boolean;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

interface MigrationResult {
  success: number;
  failed: number;
  errors: string[];
}

/**
 * Transform MongoDB theme to MedusaJS format
 */
function transformTheme(mongoTheme: MongoTheme) {
  return {
    name: mongoTheme.name,
    settings: mongoTheme.setting || {},
    is_active: mongoTheme.is_active || false,
  };
}

/**
 * Migrate themes from MongoDB to MedusaJS
 */
export async function migrateThemes(
  mongoThemes: MongoTheme[],
  container: MedusaContainer
): Promise<MigrationResult> {
  const logger = getLogger(container);
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  logger.info(`Starting migration of ${mongoThemes.length} themes...`);

  const themeService = container.resolve<ThemeModuleService>(THEME_MODULE);

  for (const mongoTheme of mongoThemes) {
    try {
      const themeData = transformTheme(mongoTheme);
      await themeService.createThemes(themeData);
      success++;
      logger.info(`✓ Migrated theme: ${mongoTheme.name}`);
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate theme ${mongoTheme.name}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  logger.info(`\nTheme migration complete:`);
  logger.info(`  Success: ${success}`);
  logger.info(`  Failed: ${failed}`);
  if (errors.length > 0) {
    logger.info(`\nErrors:`);
    errors.forEach((error) => logger.info(`  - ${error}`));
  }

  return { success, failed, errors };
}

