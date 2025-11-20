/**
 * @deprecated This controller is kept for backward compatibility
 * Most functions now delegate to order.controller.medusa which uses MedusaJS
 * Orders are created through MedusaJS checkout flow (cart.complete())
 */

import type { Order, ApiResponse } from "@/types";
import { getAllOrders as getMedusaOrders, getOrdersByCustomerId } from "./order.controller.medusa";

// Helper function to check if the API URL is defined
// @deprecated - Only used by deprecated functions
function getApiUrl(): string | null {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  if (!apiUrl) {
    console.error("API URL (NEXT_PUBLIC_BASE_URL) is not defined.");
    return null;
  }
  return apiUrl;
}

// Get all orders - DEPRECATED: Use getAllOrders from order.controller.medusa instead
// This function is kept for backward compatibility but should be migrated
export async function getAllOrders(): Promise<Order[]> {
  // Re-export from MedusaJS controller for backward compatibility
  return getMedusaOrders();
}


// Get order by code - Uses MedusaJS directly
export async function getOrderByCode(code: string | number): Promise<ApiResponse<Order> | null> {
  if (!code) return null;

  try {
    const orderCode = typeof code === "string" ? parseInt(code, 10) : code;
    
    if (isNaN(orderCode)) {
      return null;
    }

    const { getOrderByDisplayId } = await import("./order.controller.medusa");
    const order = await getOrderByDisplayId(orderCode);

    if (!order) {
      return null;
    }

    return { singleOrder: order };
  } catch (error) {
    console.error("Error fetching order by code:", error);
    return null;
  }
}

/**
 * Get user orders by customer ID - Uses MedusaJS
 */
export async function getUserOrders(id: string): Promise<Order[]> {
  if (!id) return [];
  return getOrdersByCustomerId(id);
}

/**
 * @deprecated Order codes are handled by MedusaJS display_id
 * MedusaJS automatically assigns display_id during checkout
 * This function is no longer needed
 */
async function getNextOrderCode(): Promise<number | null> {
  console.warn("getNextOrderCode is deprecated. MedusaJS handles order numbering via display_id");
  return null;
}

export default getNextOrderCode;

