"use client";

import { useState, useEffect, useCallback } from "react";
import { sdk } from "@/lib/sdk";
import type { Product } from "@/types";
import type { StoreCart, StoreCartLineItem } from "@medusajs/types";

interface CartItem {
  id: string;
  variant_id: string;
  product_id: string;
  title: string;
  quantity: number;
  unit_price: number;
  total: number;
  product?: Product;
  [key: string]: unknown;
}

// Cart interface compatible with Medusa StoreCart
// Omit 'items' from StoreCart to allow custom CartItem[] type
export interface Cart extends Omit<Partial<StoreCart>, 'items'> {
  id: string;
  items: CartItem[];
  region_id: string;
  customer_id?: string;
  email?: string;
  subtotal: number;
  tax_total: number;
  shipping_total: number;
  discount_total: number;
  total: number;
  currency_code: string;
  [key: string]: unknown;
}

// Transform StoreCartLineItem to CartItem
function transformLineItem(item: StoreCartLineItem): CartItem {
  return {
    ...item, // Include any additional properties first
    id: item.id,
    variant_id: item.variant_id || '',
    product_id: item.product_id || '',
    title: item.title || '',
    quantity: item.quantity || 0,
    unit_price: item.unit_price || 0,
    total: item.total || 0,
    product: item.product as Product | undefined,
  };
}

// Transform StoreCart to Cart
function transformCart(storeCart: StoreCart): Cart {
  return {
    ...storeCart,
    items: (storeCart.items || []).map(transformLineItem),
  } as Cart;
}

interface UseMedusaCartResult {
  cart: Cart | null;
  items: CartItem[];
  cartTotal: number;
  itemCount: number;
  isLoading: boolean;
  error: Error | null;
  addItem: (product: Product, quantity?: number, variantId?: string) => Promise<void>;
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  emptyCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  inCart: (productId: string) => boolean;
}

const CART_ID_KEY = "medusa_cart_id";

export function useMedusaCart(): UseMedusaCartResult {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Get or create cart ID
  const getCartId = useCallback((): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(CART_ID_KEY);
  }, []);

  const setCartId = useCallback((id: string | null): void => {
    if (typeof window === "undefined") return;
    if (id) {
      localStorage.setItem(CART_ID_KEY, id);
    } else {
      localStorage.removeItem(CART_ID_KEY);
    }
  }, []);

  // Fetch cart from MedusaJS
  const fetchCart = useCallback(async (cartId: string): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const { cart: fetchedCart } = await sdk.store.cart.retrieve(cartId);
      setCart(transformCart(fetchedCart));
    } catch (err) {
      const error = err as Error;
      console.error("Error fetching cart:", error);
      setError(error);
      // If cart not found, clear the stored ID
      if (error.message.includes("404") || error.message.includes("not found")) {
        setCartId(null);
        setCart(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, [setCartId]);

  // Get default region ID
  const getDefaultRegionId = useCallback(async (): Promise<string | null> => {
    try {
      const { regions } = await sdk.store.region.list();
      if (regions && regions.length > 0) {
        return regions[0].id;
      }
      console.warn("No regions found in Medusa. Please create a region first.");
      return null;
    } catch (err) {
      console.error("Error fetching regions:", err);
      return null;
    }
  }, []);

  // Create a new cart
  const createCart = useCallback(async (): Promise<string | null> => {
    try {
      // Get default region ID
      const regionId = await getDefaultRegionId();
      if (!regionId) {
        throw new Error("No region available. Please configure a region in Medusa Admin.");
      }

      const { cart: newCart } = await sdk.store.cart.create({
        region_id: regionId,
      });
      setCart(transformCart(newCart));
      if (newCart?.id) {
        setCartId(newCart.id);
        return newCart.id;
      }
      return null;
    } catch (err) {
      const error = err as Error;
      console.error("Error creating cart:", error);
      setError(error);
      return null;
    }
  }, [setCartId, getDefaultRegionId]);

  // Initialize cart on mount
  useEffect(() => {
    const initializeCart = async (): Promise<void> => {
      const cartId = getCartId();
      if (cartId) {
        await fetchCart(cartId);
      } else {
        // Create a new cart if none exists
        await createCart();
        setIsLoading(false);
      }
    };

    initializeCart();
  }, [getCartId, fetchCart, createCart]);

  // Add item to cart
  const addItem = useCallback(
    async (product: Product, quantity: number = 1, variantId?: string): Promise<void> => {
      try {
        setError(null);
        let cartId = getCartId();

        // Create cart if it doesn't exist
        if (!cartId) {
          cartId = await createCart();
          if (!cartId) {
            throw new Error("Failed to create cart");
          }
        }

        // Use the first variant if no variant ID provided
        const selectedVariantId =
          variantId || product.variants?.[0]?.id || product.id;

        if (!selectedVariantId) {
          throw new Error("No variant ID available for this product");
        }

        // Add line item to cart
        await sdk.store.cart.createLineItem(cartId, {
          variant_id: selectedVariantId,
          quantity,
        });

        // Refresh cart
        await fetchCart(cartId);
      } catch (err) {
        const error = err as Error;
        console.error("Error adding item to cart:", error);
        setError(error);
        throw error;
      }
    },
    [getCartId, createCart, fetchCart]
  );

  // Update item quantity
  const updateItemQuantity = useCallback(
    async (itemId: string, quantity: number): Promise<void> => {
      try {
        setError(null);
        const cartId = getCartId();
        if (!cartId) {
          throw new Error("Cart not found");
        }

        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          await removeItem(itemId);
          return;
        }

        await sdk.store.cart.updateLineItem(cartId, itemId, {
          quantity,
        });

        // Refresh cart
        await fetchCart(cartId);
      } catch (err) {
        const error = err as Error;
        console.error("Error updating item quantity:", error);
        setError(error);
        throw error;
      }
    },
    [getCartId, fetchCart]
  );

  // Remove item from cart
  const removeItem = useCallback(
    async (itemId: string): Promise<void> => {
      try {
        setError(null);
        const cartId = getCartId();
        if (!cartId) {
          throw new Error("Cart not found");
        }

        await sdk.store.cart.deleteLineItem(cartId, itemId);

        // Refresh cart
        await fetchCart(cartId);
      } catch (err) {
        const error = err as Error;
        console.error("Error removing item from cart:", error);
        setError(error);
        throw error;
      }
    },
    [getCartId, fetchCart]
  );

  // Empty cart
  const emptyCart = useCallback(async (): Promise<void> => {
    try {
      setError(null);
      const cartId = getCartId();
      if (!cartId) {
        return;
      }

      // Remove all items
      if (cart?.items) {
        await Promise.all(
          cart.items.map((item) =>
            sdk.store.cart.deleteLineItem(cartId, item.id)
          )
        );
      }

      // Refresh cart
      await fetchCart(cartId);
    } catch (err) {
      const error = err as Error;
      console.error("Error emptying cart:", error);
      setError(error);
      throw error;
    }
  }, [getCartId, fetchCart, cart]);

  // Refresh cart manually
  const refreshCart = useCallback(async (): Promise<void> => {
    const cartId = getCartId();
    if (cartId) {
      await fetchCart(cartId);
    }
  }, [getCartId, fetchCart]);

  // Check if product is in cart
  const inCart = useCallback(
    (productId: string): boolean => {
      if (!cart?.items) return false;
      return cart.items.some(
        (item) => item.product_id === productId || item.product?.id === productId
      );
    },
    [cart]
  );

  // Calculate totals
  const items = cart?.items || [];
  const cartTotal = cart?.total ? cart.total / 100 : 0; // Convert from cents
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    items,
    cartTotal,
    itemCount,
    isLoading,
    error,
    addItem,
    updateItemQuantity,
    removeItem,
    emptyCart,
    refreshCart,
    inCart,
  };
}

