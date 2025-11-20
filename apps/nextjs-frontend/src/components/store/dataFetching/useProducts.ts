"use client";

import { useState, useEffect } from "react";
import { getAllProducts } from "../../../app/backend/controllers/product.controller.medusa";
import { useMainContextStore } from "../provider/MainContextStore";
import { Product } from "@/types";

interface UseProductsResult {
  products: Product[];
  productsLoading: boolean;
}

const useProducts = (): UseProductsResult => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const { demo } = useMainContextStore();

  useEffect(() => {
    setProductsLoading(true);
    const fetchData = async () => {
      try {
        const res = await getAllProducts();
        const productsArray = res as Product[];
        
        const halalProudcts = productsArray.filter((p) => p.theme?.includes("Halal Food"));
        const groceryProudcts = productsArray.filter((p) => p.theme?.includes("Grocery"));
        const FurnitureProudcts = productsArray.filter((p) =>
          p.theme?.includes("Furniture")
        );
        const medicineProudcts = productsArray.filter((p) =>
          p.theme?.includes("Medicine")
        );
        const halalMeatProducts = productsArray?.filter((p) =>
          p.theme?.includes("Halal Meat")
        );

        if (demo === "Halal Food") setProducts(halalProudcts);
        if (demo === "Grocery") setProducts(groceryProudcts);
        if (demo === "Furniture") setProducts(FurnitureProudcts);
        if (demo === "Medicine") setProducts(medicineProudcts);
        if (demo === "Halal Meat") setProducts(halalMeatProducts || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchData();
  }, [demo]);

  return { products, productsLoading };
};

export default useProducts;
