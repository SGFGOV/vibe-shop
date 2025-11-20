/**
 * Staff Controller - Uses MedusaJS Admin Users
 * Read-only: Staff management is done via Medusa Admin
 * This controller provides backward compatibility for reading staff data
 */

import type { Staff } from "@/types";

/**
 * Get all staff (admin users)
 * Note: Staff management is done via Medusa Admin
 * This function is kept for backward compatibility but returns empty array
 */
export async function getAllStaffs(): Promise<Staff[]> {
  try {
    // Staff management is done via Medusa Admin
    // Returning empty array as staff should be managed via Medusa Admin
    console.warn("getAllStaffs: Staff listing requires admin access. Use Medusa Admin.");
    return [];
  } catch (error) {
    console.error("Error fetching staff from MedusaJS:", error);
    return [];
  }
}

