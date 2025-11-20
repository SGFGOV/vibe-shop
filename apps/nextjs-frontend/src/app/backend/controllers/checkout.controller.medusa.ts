// MedusaJS Checkout Controller
// Helper functions for checkout flow

import { sdk } from "../../../lib/sdk";

interface AddressData {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  country_code: string;
  province?: string;
  postal_code: string;
  phone?: string;
  company?: string;
}

interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  city?: string;
  country?: string;
  zipCode?: string;
  state?: string;
}

/**
 * Transform form data to MedusaJS address format
 */
export function transformToMedusaAddress(
  formData: CheckoutFormData,
  countryCode: string = "us"
): AddressData {
  // Split name into first and last name
  const nameParts = formData.name.trim().split(/\s+/);
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(" ") || "";

  return {
    first_name: firstName,
    last_name: lastName,
    address_1: formData.address,
    city: formData.city || "",
    country_code: formData.country || countryCode,
    province: formData.state || "",
    postal_code: formData.zipCode || "",
    phone: formData.phone,
  };
}

/**
 * Set email on cart
 */
export async function setCartEmail(cartId: string, email: string): Promise<void> {
  await sdk.store.cart.update(cartId, { email });
}

/**
 * Set addresses on cart
 */
export async function setCartAddresses(
  cartId: string,
  shipping: AddressData,
  billing?: AddressData
): Promise<void> {
  await sdk.store.cart.update(cartId, {
    shipping_address: shipping,
    billing_address: billing || shipping,
  });
}

/**
 * Get available shipping methods for cart
 */
export async function getShippingMethods(cartId: string): Promise<unknown[]> {
  try {
    const { shipping_options = [] } = await sdk.store.fulfillment.listCartOptions({
      cart_id: cartId,
    });
    return shipping_options;
  } catch (error) {
    console.error("Error fetching shipping methods:", error);
    return [];
  }
}

/**
 * Add shipping method to cart
 */
export async function addShippingMethod(
  cartId: string,
  optionId: string,
  data?: Record<string, unknown>
): Promise<void> {
  await sdk.store.cart.addShippingMethod(cartId, {
    option_id: optionId,
    data,
  });
}

/**
 * Create payment collection for cart
 * Note: Payment collections are automatically created when initiating payment sessions
 * This function is kept for backward compatibility but may not be needed
 */
export async function createPaymentCollection(cartId: string): Promise<string> {
  // Payment collections are created automatically via payment.initiatePaymentSession
  // For now, return empty string - payment collection will be created when needed
  console.warn("Payment collections are created automatically via payment.initiatePaymentSession");
  return "";
}

/**
 * Get payment providers for region
 */
export async function getPaymentProviders(regionId: string): Promise<unknown[]> {
  try {
    const { payment_providers = [] } = await sdk.store.payment.listPaymentProviders({
      region_id: regionId,
    });
    return payment_providers;
  } catch (error) {
    console.error("Error fetching payment providers:", error);
    return [];
  }
}

/**
 * Create payment session
 * Note: Payment sessions should be created via payment.initiatePaymentSession with cart
 * This function signature is kept for backward compatibility
 */
export async function createPaymentSession(
  paymentCollectionId: string,
  providerId: string
): Promise<unknown> {
  // Payment sessions are created via payment.initiatePaymentSession with cart object
  // This function may not be needed - use payment.initiatePaymentSession directly
  console.warn("Use payment.initiatePaymentSession with cart object instead");
  return null;
}

/**
 * Complete cart and create order
 */
export async function completeCart(
  cartId: string
): Promise<{ order?: unknown; error?: unknown }> {
  try {
    const result = await sdk.store.cart.complete(cartId);

    if (result.type === "cart" && result.cart) {
      // Error occurred
      return { error: result.error || new Error("Cart completion failed") };
    } else if (result.type === "order" && result.order) {
      // Success
      return { order: result.order };
    } else {
      throw new Error("Unexpected response from cart completion");
    }
  } catch (error) {
    return { error };
  }
}

