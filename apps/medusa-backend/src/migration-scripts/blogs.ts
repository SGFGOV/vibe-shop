/**
 * Blog Migration Script
 * Migrates blogs from MongoDB to MedusaJS using the Blog module
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { getLogger } from "./logger";
import { BLOG_MODULE } from "../modules/blog";
import BlogModuleService from "../modules/blog/service";

export interface MongoBlog {
  _id?: string;
  id?: string;
  title: string;
  category: string;
  description: string;
  theme?: string[];
  img?: string;
  image?: string;
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
 * Transform MongoDB blog to MedusaJS format
 */
function transformBlog(mongoBlog: MongoBlog) {
  return {
    title: mongoBlog.title,
    category: mongoBlog.category,
    description: mongoBlog.description,
    theme: mongoBlog.theme || [],
    image: mongoBlog.image || mongoBlog.img || "",
    status: mongoBlog.status || "show",
    updateDate: mongoBlog.updatedAt
      ? new Date(mongoBlog.updatedAt)
      : mongoBlog.createdAt
      ? new Date(mongoBlog.createdAt)
      : new Date(),
  };
}

/**
 * Migrate blogs from MongoDB to MedusaJS
 */
export async function migrateBlogs(
  mongoBlogs: MongoBlog[],
  container: MedusaContainer
): Promise<MigrationResult> {
  const logger = getLogger(container);
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  logger.info(`Starting migration of ${mongoBlogs.length} blogs...`);

  const blogService = container.resolve<BlogModuleService>(BLOG_MODULE);

  for (const mongoBlog of mongoBlogs) {
    try {
      const blogData = transformBlog(mongoBlog);
      await blogService.createPosts(blogData);
      success++;
      logger.info(`✓ Migrated blog: ${mongoBlog.title}`);
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate blog ${mongoBlog.title}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  logger.info(`\nBlog migration complete:`);
  logger.info(`  Success: ${success}`);
  logger.info(`  Failed: ${failed}`);
  if (errors.length > 0) {
    logger.info(`\nErrors:`);
    errors.forEach((error) => logger.info(`  - ${error}`));
  }

  return { success, failed, errors };
}

