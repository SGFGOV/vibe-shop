/**
 * Logger utility for migration scripts
 * Resolves logger from Medusa container
 */

import { MedusaContainer } from "@medusajs/framework/types";
import { ContainerRegistrationKeys } from "@medusajs/framework/utils";

/**
 * Resolve logger from Medusa container
 * @param container - Medusa container instance
 * @returns Logger instance
 */
export function getLogger(container: MedusaContainer) {
  return container.resolve(ContainerRegistrationKeys.LOGGER);
}

