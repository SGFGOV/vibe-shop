/**
 * Customer Migration Script
 * Migrates customers from MongoDB to MedusaJS using workflows
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { createCustomersWorkflow } from "@medusajs/medusa/core-flows";
import { getLogger } from "./logger";

export interface MongoCustomer {
  _id?: string;
  id?: string;
  name: string;
  email: string;
  contact?: string;
  address?: string;
  role?: string;
  status?: "show" | "hide";
  createdAt?: Date;
  updatedAt?: Date;
}

interface MigrationResult {
  success: number;
  failed: number;
  errors: string[];
}

/**
 * Transform MongoDB customer to MedusaJS format
 */
function transformCustomer(mongoCustomer: MongoCustomer): Record<string, unknown> {
  // Split name into first and last name
  const nameParts = mongoCustomer.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    email: mongoCustomer.email,
    first_name: firstName,
    last_name: lastName,
    phone: mongoCustomer.contact || "",
    has_account: mongoCustomer.status === "show",
    addresses: mongoCustomer.address
      ? [
          {
            address_1: mongoCustomer.address,
            country_code: "us", // Default, should be updated based on your data
            // Add more address fields if available
          },
        ]
      : [],
    metadata: {
      mongoId: mongoCustomer._id || mongoCustomer.id,
      originalRole: mongoCustomer.role,
    },
  };
}

/**
 * Migrate customers from MongoDB to MedusaJS using workflows
 */
export async function migrateCustomers(
  mongoCustomers: MongoCustomer[],
  container: MedusaContainer
): Promise<MigrationResult> {
  const logger = getLogger(container);
  let success = 0;
  let failed = 0;
  const errors: string[] = [];

  logger.info(`Starting migration of ${mongoCustomers.length} customers...`);

  for (const mongoCustomer of mongoCustomers) {
    try {
      // Skip if not a customer role
      if (mongoCustomer.role && mongoCustomer.role !== "Customer") {
        logger.info(`⊘ Skipped non-customer: ${mongoCustomer.name} (${mongoCustomer.role})`);
        continue;
      }

      const customerData = transformCustomer(mongoCustomer);
      const { result } = await createCustomersWorkflow(container).run({
        input: {
          customersData: [customerData],
        },
      });

      success++;
      logger.info(`✓ Migrated customer: ${mongoCustomer.email}`);
    } catch (error) {
      failed++;
      const errorMessage = `Failed to migrate customer ${mongoCustomer.email}: ${error}`;
      errors.push(errorMessage);
      logger.error(`✗ ${errorMessage}`);
    }
  }

  logger.info(`\nCustomer migration complete:`);
  logger.info(`  Success: ${success}`);
  logger.info(`  Failed: ${failed}`);
  if (errors.length > 0) {
    logger.info(`\nErrors:`);
    errors.forEach((error) => logger.info(`  - ${error}`));
  }

  return { success, failed, errors };
}

