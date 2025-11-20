"use client";

import { getProductById } from "app/backend/controllers/product.controller.medusa";
import { useState, useEffect } from "react";
import { Product } from "@/types";

interface UseSingleProductResult {
  product: Product | null;
  productLoading: boolean;
}

const useSingleProduct = (id?: string): UseSingleProductResult => {
  const [product, setProduct] = useState<Product | null>(null);
  const [productLoading, setProductLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setProductLoading(false);
        return;
      }
      
      try {
        const res = await getProductById(id);
        setProduct((res as Product) || null);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setProductLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return { product, productLoading };
};

export default useSingleProduct;
