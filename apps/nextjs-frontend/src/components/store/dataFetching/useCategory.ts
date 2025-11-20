"use client";

import { getAllCategories } from "app/backend/controllers/category.controller.medusa";
import { useState, useEffect } from "react";
import { useMainContextStore } from "../provider/MainContextStore";
import { Category } from "@/types";

interface UseCategoryResult {
  categorys: Category[];
  categoryLoading: boolean;
}

const useCategory = (): UseCategoryResult => {
  const [categorys, setCategorys] = useState<Category[]>([]);
  const [categoryLoading, setCategoryLoading] = useState(true);
  const { demo } = useMainContextStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllCategories();
        const activeCategory = (res as Category[])?.filter((c) => c.status === "show");
        
        const halalCategorys = activeCategory?.filter((p) =>
          p.theme?.includes("Halal Food")
        );
        const groceryCategorys = activeCategory?.filter((p) =>
          p.theme?.includes("Grocery")
        );
        const furnitureCategorys = activeCategory?.filter((p) =>
          p.theme?.includes("Furniture")
        );
        const medicineCategorys = activeCategory?.filter((p) =>
          p.theme?.includes("Medicine")
        );
        const halalMeatCategorys = activeCategory?.filter((p) =>
          p.theme?.includes("Halal Meat")
        );

        if (demo === "Halal Food") setCategorys(halalCategorys || []);
        if (demo === "Grocery") setCategorys(groceryCategorys || []);
        if (demo === "Furniture") setCategorys(furnitureCategorys || []);
        if (demo === "Medicine") setCategorys(medicineCategorys || []);
        if (demo === "Halal Meat") setCategorys(halalMeatCategorys || []);
      } catch (error) {
        console.error("Failed to fetch categorys:", error);
      } finally {
        setCategoryLoading(false);
      }
    };

    fetchData();
  }, [demo]);

  return { categorys, categoryLoading };
};

export default useCategory;
