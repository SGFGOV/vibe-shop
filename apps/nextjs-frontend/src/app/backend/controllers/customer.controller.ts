/**
 * Customer Controller - Uses MedusaJS Customer Module
 * Read-only: Customers are managed via Medusa Admin or store registration
 * This controller provides backward compatibility for reading customer data
 */

import { sdk } from "../../../lib/sdk";
import type { User } from "@/types";
import type { StoreCustomer } from "@medusajs/types";

/**
 * Transform MedusaJS customer to User format
 */
function transformCustomerToUser(customer: StoreCustomer): User {
  const customerData = customer as StoreCustomer & {
    first_name?: string;
    last_name?: string;
    phone?: string;
    created_at?: string;
    updated_at?: string;
  };
  
  return {
    id: customer.id,
    _id: customer.id,
    email: customer.email || "",
    name: `${customerData.first_name || ""} ${customerData.last_name || ""}`.trim() || customer.email || "",
    role: "Customer",
    status: "show",
    contact: customerData.phone || "",
    createdAt: customerData.created_at ? new Date(customerData.created_at) : undefined,
    updatedAt: customerData.updated_at ? new Date(customerData.updated_at) : undefined,
  } as User;
}

/**
 * Get all users (customers) using MedusaJS Store API
 * Note: Store API only returns customers for authenticated sessions
 * For admin operations, use Medusa Admin
 */
export async function getAllUser(): Promise<User[]> {
  try {
    // Note: Store API doesn't have a list customers endpoint
    // This would require admin access or customer authentication
    // Returning empty array as customers should be managed via Medusa Admin
    console.warn("getAllUser: Customer listing requires admin access. Use Medusa Admin.");
    return [];
  } catch (error) {
    console.error("Error fetching customers from MedusaJS:", error);
    return [];
  }
}

