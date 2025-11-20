"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Product } from "@/types";

interface WishlistContextValue {
  handleWishlist: (item: Product) => void;
  wishlist: Product[];
  removeWishlist: (item: Product) => void;
}

const WishlistContext = createContext<WishlistContextValue | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]") as Product[];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlist = (item: Product) => {
    const exists = wishlist.some((w) => w._id === item._id);

    if (exists) {
      // If the item exists, remove it from the wishlist
      removeWishlist(item);
    } else {
      // If the item does not exist, add it to the wishlist
      const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]") as Product[];
      const updatedWishlist = [...storedWishlist, item];
      setWishlist(updatedWishlist);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    }
  };

  const removeWishlist = (item: Product) => {
    const updatedWishlist = wishlist.filter(
      (wishlistItem) => wishlistItem._id !== item._id
    );
    setWishlist(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider
      value={{ handleWishlist, wishlist, removeWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// Custom Hook to use Wishlist Context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

