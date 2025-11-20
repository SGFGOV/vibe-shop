"use client";
import { useMedusaCart } from "@/hooks/useMedusaCart";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Product } from "@/types";

interface UseAddToCartResult {
  handelAddItem: (product: Product) => void;
  quantity: number;
  handleIncrement: () => void;
  handleDecrement: () => void;
  addToCardLoading: boolean;
}

const useAddToCart = (): UseAddToCartResult => {
  const session = useSession();
  const [quantity, setQuantity] = useState(1);
  const [addToCardLoading, setAddToCardLoading] = useState(false);
  const { addItem, items, updateItemQuantity } = useMedusaCart();

  const handleIncrement = () => setQuantity((prev: number) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev: number) => (prev > 1 ? prev - 1 : prev));

  const handelAddItem = async (product: Product) => {
    setAddToCardLoading(true);

    if (session?.data) {
      if (session.data.user?.role !== "Customer") {
        toast.error("You are not a customer");
        setAddToCardLoading(false);
        return;
      }
    }

    try {
      // Find existing item in cart
      const existingItem = items.find(
        (item) => item.product_id === product.id || item.product?.id === product.id
      );

      if (existingItem) {
        const newQuantity = Number(existingItem.quantity) + Number(quantity);
        await updateItemQuantity(existingItem.id, newQuantity);
        toast.success(`${product.name} added ${quantity} quantity successfully`);
      } else {
        // Add new item to cart
        await addItem(product, quantity);
        toast.success(`${product.name} added to cart successfully`);
      }
      setQuantity(1);
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
    } finally {
      setAddToCardLoading(false);
    }
  };

  useEffect(() => {
    // Effect for addToCardLoading if needed
  }, [addToCardLoading]);

  return {
    handelAddItem,
    quantity,
    handleIncrement,
    handleDecrement,
    addToCardLoading,
  };
};

export default useAddToCart;

