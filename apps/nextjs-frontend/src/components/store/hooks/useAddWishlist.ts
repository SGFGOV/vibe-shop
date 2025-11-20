"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types";

interface UseAddWishlistResult {
  handleWishlist: (item: Product) => void;
  wishlist: Product[];
  removeWishlist: (item: Product) => void;
}

const useAddWishlist = (): UseAddWishlistResult => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]") as Product[];
    setWishlist(storedWishlist);
  }, []);

  const handleWishlist = (item: Product) => {
    const exists = wishlist.some((w) => w._id === item._id);

    if (exists) {
      removeWishlist(item);
    } else {
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

  return {
    handleWishlist,
    wishlist,
    removeWishlist,
  };
};

export default useAddWishlist;

