/**
 * User Controller - Uses MedusaJS Customer Module
 * Read-only: User management is done via Medusa Admin or store registration
 * This controller provides backward compatibility for reading user data
 */

import { sdk } from "../../../lib/sdk";
import type { User, ApiResponse } from "@/types";
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
 * Get all users (customers) using MedusaJS
 * Note: Customer listing requires admin access
 * For admin operations, use Medusa Admin
 */
export async function getAllUser(): Promise<User[]> {
  try {
    // Note: Store API doesn't have a list customers endpoint
    // This would require admin access
    // Returning empty array as customers should be managed via Medusa Admin
    console.warn("getAllUser: Customer listing requires admin access. Use Medusa Admin.");
    return [];
  } catch (error) {
    console.error("Error fetching users from MedusaJS:", error);
    return [];
  }
}

/**
 * Get user by ID using MedusaJS Store API
 * Note: This only works for authenticated customers accessing their own data
 */
export async function getUserById(id: string): Promise<User | null> {
  if (!id) {
    return null;
  }

  try {
    // Note: Store API customer.retrieve requires authentication
    // This should be called from authenticated customer context
    console.warn("getUserById: Customer retrieval requires authentication. Use authenticated store API.");
    return null;
  } catch (error) {
    console.error("Error fetching user from MedusaJS:", error);
    return null;
  }
}

/**
 * Create user (customer) using MedusaJS Store API
 * Note: This is for customer registration, not admin creation
 */
export async function createUser(
  userData: Partial<User>
): Promise<ApiResponse<User> | null> {
  try {
    // Split name into first and last name
    const nameParts = (userData.name || "").trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";

    // Create customer using MedusaJS Store API (for customer registration)
    // Note: Password is handled separately via auth endpoints
    const { customer } = await sdk.store.customer.create({
      email: userData.email || "",
      first_name: firstName,
      last_name: lastName,
      phone: userData.contact || "",
    });

    const transformedUser = transformCustomerToUser(customer as StoreCustomer);
    return {
      data: transformedUser,
      user: transformedUser, // Keep for backward compatibility
    } as ApiResponse<User> & { user: User };
  } catch (error) {
    console.error("Error creating user in MedusaJS:", error);
    const err = error as { message?: string };
    return {
      error: err.message || "Failed to create user",
    } as ApiResponse<User>;
  }
}

/**
 * Update user profile using MedusaJS Store API
 * Note: This requires customer authentication - customers can update their own profiles
 */
export async function updateUserProfile(
  id: string,
  updateUserData: Partial<User>
): Promise<ApiResponse<User> | null> {
  if (!id) {
    return null;
  }

  try {
    // Split name into first and last name if provided
    const updateData: Record<string, unknown> = {};

    if (updateUserData.name) {
      const nameParts = updateUserData.name.trim().split(/\s+/);
      updateData.first_name = nameParts[0] || "";
      updateData.last_name = nameParts.slice(1).join(" ") || "";
    }

    if (updateUserData.email) {
      updateData.email = updateUserData.email;
    }

    if (updateUserData.contact) {
      updateData.phone = updateUserData.contact;
    }

    // Use store API for customer profile updates (requires authentication)
    const { customer } = await sdk.store.customer.update(updateData);

    return {
      user: transformCustomerToUser(customer as StoreCustomer),
      message: "Profile updated successfully",
    };
  } catch (error) {
    console.error("Error updating user in MedusaJS:", error);
    const err = error as { message?: string };
    return {
      error: err.message || "Failed to update profile",
    };
  }
}

