"use client";

import { useState, useCallback } from "react";
import { sdk } from "@/lib/sdk";
import { useMedusaCart } from "./useMedusaCart";

interface Address {
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

interface ShippingMethod {
  option_id: string;
  data?: Record<string, unknown>;
}

interface UseMedusaCheckoutResult {
  // State
  isLoading: boolean;
  error: Error | null;
  
  // Email
  setEmail: (email: string) => Promise<void>;
  
  // Addresses
  setAddresses: (shipping: Address, billing?: Address) => Promise<void>;
  
  // Shipping
  setShippingMethod: (optionId: string, data?: Record<string, unknown>) => Promise<void>;
  getShippingOptions: () => Promise<unknown[]>;
  
  // Payment
  setPaymentMethod: (providerId: string) => Promise<{ payment_session?: unknown; error?: Error }>;
  getPaymentProviders: () => Promise<unknown[]>;
  
  // Complete
  completeCheckout: () => Promise<{ order?: unknown; error?: unknown }>;
}

export function useMedusaCheckout(): UseMedusaCheckoutResult {
  const { cart, refreshCart } = useMedusaCart();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Set customer email
  const setEmail = useCallback(
    async (email: string): Promise<void> => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }

      try {
        setIsLoading(true);
        setError(null);
        await sdk.store.cart.update(cart.id, {
          email,
        });
        await refreshCart();
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cart, refreshCart]
  );

  // Set shipping and billing addresses
  const setAddresses = useCallback(
    async (shipping: Address, billing?: Address): Promise<void> => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }

      try {
        setIsLoading(true);
        setError(null);
        await sdk.store.cart.update(cart.id, {
          shipping_address: shipping,
          billing_address: billing || shipping, // Use shipping as billing if not provided
        });
        await refreshCart();
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cart, refreshCart]
  );

  // Get available shipping options
  const getShippingOptions = useCallback(async (): Promise<unknown[]> => {
    if (!cart?.id) {
      return [];
    }

    try {
      setError(null);
      const { shipping_options = [] } = await sdk.store.fulfillment.listCartOptions({
        cart_id: cart.id,
      });
      return shipping_options;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error("Error fetching shipping options:", error);
      return [];
    }
  }, [cart]);

  // Set shipping method
  const setShippingMethod = useCallback(
    async (optionId: string, data?: Record<string, unknown>): Promise<void> => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }

      try {
        setIsLoading(true);
        setError(null);
        await sdk.store.cart.addShippingMethod(cart.id, {
          option_id: optionId,
          data,
        });
        await refreshCart();
      } catch (err) {
        const error = err as Error;
        setError(error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [cart, refreshCart]
  );

  // Get available payment providers
  const getPaymentProviders = useCallback(async (): Promise<unknown[]> => {
    if (!cart?.id || !cart?.region_id) {
      return [];
    }

    try {
      setError(null);
      // Get payment providers for the region
      // Payment collection is not needed here - it will be created automatically
      // by initiatePaymentSession when the customer selects a payment method
      const { payment_providers = [] } = await sdk.store.payment.listPaymentProviders({
        region_id: cart.region_id,
      });
      return payment_providers;
    } catch (err) {
      const error = err as Error;
      setError(error);
      console.error("Error fetching payment providers:", error);
      return [];
    }
  }, [cart]);

  // Set payment method - Creates payment session using MedusaJS payment.initiatePaymentSession
  const setPaymentMethod = useCallback(
    async (providerId: string): Promise<{ payment_session?: unknown; error?: Error }> => {
      if (!cart?.id) {
        throw new Error("Cart not found");
      }

      try {
        setIsLoading(true);
        setError(null);
        
        // Retrieve the cart from SDK to get proper StoreCart type for initiatePaymentSession
        const { cart: storeCart } = await sdk.store.cart.retrieve(cart.id);
        
        // Use MedusaJS payment.initiatePaymentSession which handles payment collection creation
        // This is the recommended way per MedusaJS documentation
        // initiatePaymentSession automatically creates a payment collection if one doesn't exist
        const { payment_collection } = await sdk.store.payment.initiatePaymentSession(
          storeCart,
          {
            provider_id: providerId,
          }
        );
        
        // Refresh cart to get updated payment collection with session
        await refreshCart();
        
        // Get the updated cart to retrieve payment session
        const updatedCart = await sdk.store.cart.retrieve(cart.id, {
          fields: "payment_collection.*payment_sessions",
        });
        
        // Return the payment session for Stripe integration
        const paymentSession = updatedCart.cart?.payment_collection?.payment_sessions?.[0] || 
                               payment_collection?.payment_sessions?.[0];
        return { payment_session: paymentSession };
      } catch (err) {
        const error = err as Error;
        setError(error);
        return { error };
      } finally {
        setIsLoading(false);
      }
    },
    [cart, refreshCart]
  );

  // Complete checkout and create order
  const completeCheckout = useCallback(async (): Promise<{ order?: unknown; error?: unknown }> => {
    if (!cart?.id) {
      throw new Error("Cart not found");
    }

    try {
      setIsLoading(true);
      setError(null);

      // Complete the cart - this creates the order
      const result = await sdk.store.cart.complete(cart.id);

      if (result.type === "cart" && result.cart) {
        // Error occurred
        const error = result.error || new Error("Cart completion failed");
        setError(error as Error);
        return { error };
      } else if (result.type === "order" && result.order) {
        // Success - order created
        await refreshCart(); // Clear cart
        return { order: result.order };
      } else {
        throw new Error("Unexpected response from cart completion");
      }
    } catch (err) {
      const error = err as Error;
      setError(error);
      return { error };
    } finally {
      setIsLoading(false);
    }
  }, [cart, refreshCart]);

  return {
    isLoading,
    error,
    setEmail,
    setAddresses,
    setShippingMethod,
    getShippingOptions,
    setPaymentMethod,
    getPaymentProviders,
    completeCheckout,
  };
}

