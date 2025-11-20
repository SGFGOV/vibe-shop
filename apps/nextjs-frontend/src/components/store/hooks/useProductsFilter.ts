"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { Product } from "@/types";

interface UseProductFilterResult {
  searchText: string;
  setSearchText: (text: string) => void;
  sortValue: string;
  setSortValue: (value: string) => void;
  currentPage: number;
  handlePageChange: (data: { selected: number }) => void;
  resetFilters: () => void;
  pageCount: number;
  filteredProducts: Product[];
  itemsPerPage: number;
  incrementItems: () => void;
  decrementItems: () => void;
  filterMinPrice: number;
  setFilterMinPrice: (price: number) => void;
  filterMaxPrice: number;
  setFilterMaxPrice: (price: number) => void;
  sortedAndFilteredProducts: Product[];
}

const useProductFilter = (allProducts: Product[], categoryOrBrand?: string): UseProductFilterResult => {
  const router = useRouter();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts);
  const [filterMinPrice, setFilterMinPrice] = useState(0);
  const [filterMaxPrice, setFilterMaxPrice] = useState(10000);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchText, setSearchText] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  const normalizedSortValue = sortValue?.replaceAll(" ", "").toLowerCase();

  const handlePageChange = ({ selected }: { selected: number }) => setCurrentPage(selected);

  const incrementItems = () => setItemsPerPage((prev) => prev + 1);
  const decrementItems = () => setItemsPerPage((prev) => Math.max(1, prev - 1));

  const sortedAndFilteredProducts = useMemo(() => {
    if (!Array.isArray(allProducts) || allProducts.length === 0) return [];

    let updatedProducts = [...allProducts];

    if (categoryOrBrand) {
      updatedProducts = updatedProducts.filter(
        (product) =>
          product?.category?.replace(/\s+/g, "").toLowerCase() ===
            categoryOrBrand ||
          product?.brand?.replace(/\s+/g, "").toLowerCase() ===
            categoryOrBrand ||
          product?.name.toLowerCase().includes(categoryOrBrand.toLowerCase())
      );
    }

    updatedProducts = updatedProducts.filter(
      (product) =>
        (product?.prices?.price || 0) >= filterMinPrice &&
        (product?.prices?.price || 0) <= filterMaxPrice
    );

    if (searchText) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (normalizedSortValue) {
      if (normalizedSortValue === "popularity") {
        updatedProducts.sort((a, b) => (b.numOfReviews || 0) - (a.numOfReviews || 0));
      } else if (normalizedSortValue === "a_zorder") {
        updatedProducts.sort((a, b) => a.name.localeCompare(b.name));
      } else if (normalizedSortValue === "z_aorder") {
        updatedProducts.sort((a, b) => b.name.localeCompare(a.name));
      } else if (normalizedSortValue === "low_highprice") {
        updatedProducts.sort(
          (a, b) =>
            Number(a.prices?.originalPrice || 0) - Number(b.prices?.originalPrice || 0)
        );
      } else if (normalizedSortValue === "high_lowprice") {
        updatedProducts.sort(
          (a, b) =>
            Number(b.prices?.originalPrice || 0) - Number(a.prices?.originalPrice || 0)
        );
      }
    }

    return updatedProducts;
  }, [
    allProducts,
    categoryOrBrand,
    filterMinPrice,
    filterMaxPrice,
    searchText,
    normalizedSortValue,
  ]);

  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return sortedAndFilteredProducts.slice(
      startIndex,
      startIndex + itemsPerPage
    );
  }, [currentPage, itemsPerPage, sortedAndFilteredProducts]);

  const pageCount = useMemo(() => {
    return Math.ceil(sortedAndFilteredProducts.length / itemsPerPage);
  }, [sortedAndFilteredProducts.length, itemsPerPage]);

  useEffect(() => {
    setFilteredProducts(paginatedProducts);
  }, [paginatedProducts]);

  useEffect(() => {
    setCurrentPage(0);
  }, [categoryOrBrand, filterMinPrice, filterMaxPrice, searchText, sortValue]);

  const resetFilters = () => {
    setSearchText("");
    setSortValue("");
    setFilterMinPrice(0);
    setFilterMaxPrice(10000);
    setCurrentPage(0);
    router.refresh();
  };

  return {
    searchText,
    setSearchText,
    sortValue,
    setSortValue,
    currentPage,
    handlePageChange,
    resetFilters,
    pageCount,
    filteredProducts,
    itemsPerPage,
    incrementItems,
    decrementItems,
    filterMinPrice,
    setFilterMinPrice,
    filterMaxPrice,
    setFilterMaxPrice,
    sortedAndFilteredProducts,
  };
};

export default useProductFilter;

