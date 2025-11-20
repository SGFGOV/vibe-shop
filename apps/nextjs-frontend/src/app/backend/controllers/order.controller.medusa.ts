// MedusaJS-based Order Controller
// This is the new implementation using MedusaJS SDK
// Read-only: Order management is done via Medusa Admin

import { sdk } from "../../../lib/sdk";
import type { Order } from "@/types";
import type { StoreOrder } from "@medusajs/types";

interface OrderOptions {
  limit?: number;
  offset?: number;
  customer_id?: string;
  next?: { tags: string[] };
}

/**
 * Get all orders using MedusaJS Store API
 * Note: Store API only returns orders for authenticated customers
 */
export async function getAllOrders(
  options: OrderOptions = {}
): Promise<Order[]> {
  try {
    const { orders = [] } = await sdk.store.order.list(
      {
        limit: options.limit || 100,
        offset: options.offset || 0,
        // Note: customer_id filter is not available in store API
        // Store API automatically filters by authenticated customer
      },
      {
        next: options.next || { tags: ["orders"] },
      }
    );

    return orders.map((order: StoreOrder) => transformMedusaOrder(order));
  } catch (error) {
    console.error("Error fetching orders from MedusaJS:", error);
    return [];
  }
}

/**
 * Get single order by ID using MedusaJS Store API
 */
export async function getOrderById(
  id: string,
  options: OrderOptions = {}
): Promise<Order | null> {
  if (!id) {
    console.error("Order ID is required");
    return null;
  }

  try {
    const { order } = await sdk.store.order.retrieve(
      id,
      {},
      {
        next: options.next || { tags: ["order", id] },
      }
    );

    if (!order) {
      return null;
    }

    return transformMedusaOrder(order as StoreOrder);
  } catch (error) {
    console.error("Error fetching order from MedusaJS:", error);
    return null;
  }
}

/**
 * Get orders by customer ID
 * Note: Store API only returns orders for authenticated customers
 * This function calls getAllOrders which automatically filters by authenticated customer
 */
export async function getOrdersByCustomerId(
  customerId: string,
  options: OrderOptions = {}
): Promise<Order[]> {
  // Store API automatically filters by authenticated customer
  // If customerId matches the authenticated customer, return orders
  // Otherwise, this would require admin access
  return getAllOrders(options);
}

/**
 * Get order by display_id (order code) using MedusaJS Store API
 * Note: This requires customer authentication or admin access
 */
export async function getOrderByDisplayId(
  displayId: number,
  options: OrderOptions = {}
): Promise<Order | null> {
  if (!displayId || isNaN(displayId)) {
    console.error("Valid display ID is required");
    return null;
  }

  try {
    // Fetch orders using store API (requires authentication)
    // Note: Store API only returns orders for authenticated customers
    const { orders = [] } = await sdk.store.order.list(
      {
        limit: options.limit || 1000,
        offset: options.offset || 0,
      },
      {
        next: options.next || { tags: ["orders"] },
      }
    );

    const order = orders.find((o) => (o as StoreOrder & { display_id?: number }).display_id === displayId);

    if (!order) {
      return null;
    }

    return transformMedusaOrder(order as StoreOrder);
  } catch (error) {
    console.error("Error fetching order by display ID from MedusaJS:", error);
    return null;
  }
}

/**
 * Transform MedusaJS order to match your current order structure
 */
function transformMedusaOrder(medusaOrder: StoreOrder): Order {
  const order = medusaOrder as StoreOrder & {
    display_id?: number;
    items?: Array<{
      id: string;
      title?: string;
      quantity: number;
      unit_price?: number;
      total?: number;
      variant?: {
        id: string;
        title?: string;
        product?: {
          id: string;
          title?: string;
          images?: Array<{ url: string }>;
        };
      };
    }>;
    shipping_address?: {
      first_name?: string;
      last_name?: string;
      address_1?: string;
      city?: string;
      country_code?: string;
      postal_code?: string;
      phone?: string;
    };
    billing_address?: {
      first_name?: string;
      last_name?: string;
      address_1?: string;
      city?: string;
      country_code?: string;
      postal_code?: string;
      phone?: string;
    };
    subtotal?: number;
    tax_total?: number;
    shipping_total?: number;
    discount_total?: number;
    total?: number;
    currency_code?: string;
    created_at?: string;
    updated_at?: string;
    metadata?: Record<string, unknown>;
  };
  // Transform cart items to order items format
  const cartItems = order.items?.map((item) => ({
    id: item.id,
    name: item.title || item.variant?.product?.title || "",
    price: (item.unit_price || 0) / 100, // Convert from cents
    quantity: item.quantity,
    image: item.variant?.product?.images?.[0]?.url || "",
    product: item.variant?.product,
  })) || [];

  // Transform addresses
  const shippingAddress = order.shipping_address;
  const billingAddress = order.billing_address;

  const userInfo = shippingAddress
    ? {
        name: `${shippingAddress.first_name || ""} ${shippingAddress.last_name || ""}`.trim(),
        email: (medusaOrder as StoreOrder & { email?: string }).email || "",
        contact: shippingAddress.phone || "",
        address: shippingAddress.address_1 || "",
        city: shippingAddress.city || "",
        country: shippingAddress.country_code || "",
        zipCode: shippingAddress.postal_code || "",
      }
    : undefined;

  // Map status
  const statusMap: Record<string, "Pending" | "Processing" | "Delivered" | "Cancel"> = {
    pending: "Pending",
    awaiting_payment: "Pending",
    awaiting_fulfillment: "Processing",
    awaiting_shipment: "Processing",
    partially_shipped: "Processing",
    shipped: "Processing",
    partially_returned: "Processing",
    returned: "Processing",
    canceled: "Cancel",
    completed: "Delivered",
  };

  return {
    id: medusaOrder.id,
    _id: medusaOrder.id,
    orderCode: order.display_id || 0,
    cart: cartItems,
    user_info: userInfo,
    subTotal: (order.subtotal || 0) / 100, // Convert from cents
    shippingCost: (order.shipping_total || 0) / 100,
    discount: (order.discount_total || 0) / 100,
    taxes: (order.tax_total || 0) / 100,
    total: (order.total || 0) / 100,
    paymentMethod: (order.metadata?.paymentMethod as string) || "unknown",
    status: statusMap[(medusaOrder as StoreOrder & { status?: string }).status || ""] || "Pending",
    createdAt: order.created_at ? new Date(order.created_at) : undefined,
    updatedAt: order.updated_at ? new Date(order.updated_at) : undefined,
    metadata: order.metadata,
  } as Order;
}

/**
 * Note: Orders are created through the checkout flow (cart.complete())
 * This controller is read-only for retrieving orders
 * Order management is done via Medusa Admin
 */

