/**
 * Product Migration Script
 * Migrates products from MongoDB to MedusaJS using workflows
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { 
  createProductsWorkflow,
  createProductTagsWorkflow,
  updateProductsWorkflow,
} from "@medusajs/medusa/core-flows";
import { getLogger } from "./logger";
import type { CreateProductWorkflowInputDTO } from "@medusajs/types";

export interface MongoProduct {
  _id?: string;
  id?: string;
  name: string;
  description?: string;
  slug: string;
  image: string[];
  category?: string; // Category name (used for mapping)
  categoryId?: string; // Category ID (if available)
  brand?: string;
  prices: {
    originalPrice?: number;
    price: number;
    discount?: number;
  };
  stock?: number;
  status?: "show" | "hide";
  theme?: string[];
  tag?: string[];
  videoUrl?: string;
  flashSale?: boolean;
  isCombination?: boolean;
  ratings?: unknown[];
  averageRating?: number;
  variants?: Array<{
    id?: string;
    title?: string;
    price?: number;
    stock?: number;
    [key: string]: unknown;
  }>;
  sku?: string;
  barcode?: string;
  unit?: string;
  [key: string]: unknown;
}

interface MigrationResult {
  success: number;
  failed: number;
  errors: string[];
}

/**
 * Transform MongoDB product to MedusaJS format
 * IMPORTANT: In MedusaJS, prices are stored on variants, not products.
 * Every product MUST have at least one variant with prices.
 */
function transformProduct(
  mongoProduct: MongoProduct,
  categoryMap: Map<string, string>, // Maps old MongoDB ID to new Medusa ID
  categoryNameMap: Map<string, string>, // Maps category name to new Medusa ID
  regionId?: string
): CreateProductWorkflowInputDTO {
  // Get category ID from map - try categoryId first, then category name
  let categoryId: string | null = null;
  if (mongoProduct.categoryId) {
    categoryId = categoryMap.get(mongoProduct.categoryId) || null;
  }
  if (!categoryId && mongoProduct.category) {
    categoryId = categoryNameMap.get(mongoProduct.category) || null;
  }

  // Get the price from product or variant
  // Prices in MedusaJS are stored in cents (multiply by 100)
  const getPriceAmount = (price?: number): number => {
    if (!price || price <= 0) {
      throw new Error(`Invalid price for product ${mongoProduct.name}: ${price}`);
    }
    return Math.round(price * 100); // Convert to cents
  };

  // Build price object - can include region_id in rules for region-specific pricing
  const buildPrice = (amount: number) => {
    const price: { amount: number; currency_code: string; rules?: { region_id: string } } = {
      amount,
      currency_code: "usd", // Default currency, adjust if needed
    };

    // Add region_id rule if provided (for region-specific pricing)
    if (regionId) {
      price.rules = { region_id: regionId };
    }

    return price;
  };

  // Transform variants or create default variant
  // CRITICAL: Every product must have at least one variant with prices
  const variants = mongoProduct.variants?.length
    ? mongoProduct.variants.map((variant) => {
        // Use variant price if available, otherwise fall back to product price
        const variantPrice = variant.price ?? mongoProduct.prices.price;
        if (!variantPrice || variantPrice <= 0) {
          throw new Error(
            `Variant ${variant.title || mongoProduct.name} has no valid price`
          );
        }

        return {
          title: variant.title || mongoProduct.name,
          prices: [buildPrice(getPriceAmount(variantPrice))],
          inventory_quantity: variant.stock ?? mongoProduct.stock ?? 0,
          manage_inventory: true,
          sku: mongoProduct.sku || undefined,
          metadata: {
            barcode: mongoProduct.barcode || undefined,
            unit: mongoProduct.unit || undefined,
          },
        };
      })
    : [
        // Create default variant if product has no variants
        {
          title: mongoProduct.name,
          prices: [buildPrice(getPriceAmount(mongoProduct.prices.price))],
          inventory_quantity: mongoProduct.stock ?? 0,
          manage_inventory: true,
          sku: mongoProduct.sku || undefined,
          metadata: {
            barcode: mongoProduct.barcode || undefined,
            unit: mongoProduct.unit || undefined,
          },
        },
      ];

  return {
    title: mongoProduct.name,
    description: mongoProduct.description || "",
    handle: mongoProduct.slug,
    status: mongoProduct.status === "show" ? "published" : "draft",
    images: mongoProduct.image?.map((url) => ({ url })) || [],
    variants, // Variants with prices attached
    category_ids:  categoryId? [categoryId]: undefined,
    metadata: {
      brand: mongoProduct.brand || "",
      theme: mongoProduct.theme || [],
      videoUrl: mongoProduct.videoUrl || "",
      flashSale: mongoProduct.flashSale || false,
      isCombination: mongoProduct.isCombination || false,
      ratings: mongoProduct.ratings || [],
      averageRating: mongoProduct.averageRating || 0,
      originalPrice: mongoProduct.prices.originalPrice || mongoProduct.prices.price,
    },
    // Tags are NOT included here - they must be created separately and attached after product creation
  };
}

/**
 * Create product tags and return their IDs
 * Uses createProductTagsWorkflow to create tags
 * Note: If tags with the same value already exist, they will be created as duplicates
 */
async function createOrGetProductTags(
  tagValues: string[],
  container: MedusaContainer
): Promise<string[]> {
  if (!tagValues || tagValues.length === 0) {
    return [];
  }

  try {
    // Create tags using workflow (this will create new tags or return existing ones)
    const { result } = await createProductTagsWorkflow(container).run({
      input: {
        product_tags: tagValues.map((value) => ({ value })),
      },
    });

    // Extract tag IDs from the result
    return result.map((tag) => tag.id);
  } catch (error) {
    throw new Error(`Failed to create/get product tags: ${error}`);
  }
}

/**
 * Migrate products from MongoDB to MedusaJS using workflows
 * 
 * IMPORTANT NOTES:
 * - Prices are stored on variants, NOT products
 * - Every product MUST have at least one variant with prices
 * - Prices are stored in cents (amount * 100)
 * - Prices can include region_id in rules for region-specific pricing
 * - Tags must be created separately and attached after product creation
 * 
 * @param mongoProducts - Array of MongoDB products to migrate
 * @param categoryMap - Map of old category IDs to new Medusa category IDs
 * @param container - Medusa container
 * @param regionId - Optional region ID for region-specific pricing
 */
export async function migrateProducts(
  mongoProducts: MongoProduct[],
  categoryMap: Map<string, string>, // Maps old MongoDB ID to new Medusa ID
  categoryNameMap: Map<string, string>, // Maps category name to new Medusa ID
  container: MedusaContainer,
  regionId?: string
): Promise<MigrationResult> {
  const logger = getLogger(container);
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  logger.info(`Starting migration of ${mongoProducts.length} products...`);
  if (regionId) {
    logger.info(`Using region_id: ${regionId} for pricing`);
  }

  for (const mongoProduct of mongoProducts) {
    try {
      // Validate product has a price
      if (!mongoProduct.prices?.price || mongoProduct.prices.price <= 0) {
        throw new Error(
          `Product ${mongoProduct.name} has no valid price (${mongoProduct.prices?.price})`
        );
      }

      // Transform product data (includes variants with prices, but NO tags)
      const productData = transformProduct(mongoProduct, categoryMap, categoryNameMap, regionId);

      // Create product using workflow
      const { result } = await createProductsWorkflow(container).run({
        input: {
          products: [productData],
        },
      });

      // Get the created product ID
      const createdProduct = result[0];
      if (!createdProduct?.id) {
        throw new Error(`Product was created but no ID was returned`);
      }

      // Create/upsert tags and attach them to the product
      if (mongoProduct.tag && mongoProduct.tag.length > 0) {
        try {
          // Create or get existing tags
          const tagIds = await createOrGetProductTags(mongoProduct.tag, container);

          // Attach tags to the product using updateProductsWorkflow
          if (tagIds.length > 0) {
            await updateProductsWorkflow(container).run({
              input: {
                products: [
                  {
                    id: createdProduct.id,
                    tag_ids: tagIds,
                  },
                ],
              },
            });
            logger.info(
              `  → Attached ${tagIds.length} tag(s) to product: ${mongoProduct.name}`
            );
          }
        } catch (tagError) {
          // Log tag error but don't fail the entire product migration
          logger.warn(
            `  ⚠ Failed to attach tags to product ${mongoProduct.name}: ${tagError}`
          );
        }
      }

      success++;
      const variants = productData.variants as Array<unknown> | undefined;
      logger.info(
        `✓ Migrated product: ${mongoProduct.name} (${variants?.length || 0} variant(s))`
      );
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate product ${mongoProduct.name}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  logger.info(`\nProduct migration complete:`);
  logger.info(`  Success: ${success}`);
  logger.info(`  Failed: ${failed}`);
  if (errors.length > 0) {
    logger.info(`\nErrors:`);
    errors.forEach((error) => logger.info(`  - ${error}`));
  }

  return { success, failed, errors };
}

