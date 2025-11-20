"use client";

import { getAllBrands } from "app/backend/controllers/brand.controller.medusa";
import { useState, useEffect } from "react";
import { useMainContextStore } from "../provider/MainContextStore";
import { Brand } from "@/types";

interface UseBrandResult {
  brands: Brand[];
  brandLoading: boolean;
}

const usebrands = (): UseBrandResult => {
  const [brands, setbrands] = useState<Brand[]>([]);
  const [brandLoading, setBrandsLoading] = useState(true);
  const { demo } = useMainContextStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBrands();
        const res2 = (res as Brand[])?.filter((c) => c.status === "show");
        setbrands(res2 || []);
      } catch (error) {
        console.error("Failed to fetch brands:", error);
      } finally {
        setBrandsLoading(false);
      }
    };

    fetchData();
  }, [demo]);

  return { brands, brandLoading };
};

export default usebrands;
