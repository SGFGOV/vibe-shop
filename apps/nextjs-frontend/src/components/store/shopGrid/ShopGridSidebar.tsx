"use client";

import Link from "next/link";
import useCategory from "../dataFetching/useCategory";
import usebrands from "../dataFetching/useBrand";
import { Product, Category, Brand } from "@/types";

interface ShopGridSidebarProps {
  setFilterMinPrice: (value: number) => void;
  setFilterMaxPrice: (value: number) => void;
  resetFilters: () => void;
  filterMaxPrice: number;
  filterMinPrice: number;
  setSearchText: (value: string) => void;
  searchText: string;
  products?: Product[];
}

const ShopGridSidebar = ({
  setFilterMinPrice,
  setFilterMaxPrice,
  resetFilters,
  filterMaxPrice,
  filterMinPrice,
  setSearchText,
  searchText,
  products,
}: ShopGridSidebarProps) => {
  const { categorys } = useCategory();
  const { brands } = usebrands();

  return (
    <>
      <div className="col-xl-3">
        <div className="gshop-sidebar bg-white rounded-2 overflow-hidden">
          <div className="sidebar-widget search-widget bg-white py-5 px-4">
            <div className="widget-title d-flex">
              <h6 className="mb-0 flex-shrink-0">Search Now</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <form className="search-form d-flex align-items-center mt-4">
              <input
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                type="text"
                placeholder="Search..."
              />
              <button type="button" className="submit-icon-btn-secondary">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          <div className="sidebar-widget category-widget bg-white py-5 px-4 border-top">
            <div className="widget-title d-flex">
              <h6 className="mb-0 flex-shrink-0">Categories</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <ul
              className="widget-nav next_sidebar mt-4 pe-3"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {categorys?.map((category, index) => (
                <li key={index}>
                  <Link
                    href={`/products/category=${category.name
                      ?.replace(/\s+/g, "")
                      .toLowerCase()}=${category._id}`}
                    className="d-flex justify-content-between align-items-center"
                  >
                    {category.name}
                    <span className="fw-bold fs-xs total-count">
                      {
                        products?.filter(
                          (p) =>
                            p.category?.replace(/\s+/g, "").toLowerCase() ===
                            `${category.name?.replace(/\s+/g, "").toLowerCase()}`
                        ).length
                      }{" "}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="sidebar-widget price-filter-widget bg-white py-5 px-4 border-top">
            <div className="widget-title d-flex">
              <h6 className="mb-0 flex-shrink-0">Filter by Price</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>

            <div className="at-pricing-range mt-4">
              <form className="range-slider-form">
                <div className="price-filter-range"></div>
                <div className="d-flex align-items-center mt-3">
                  <input
                    onChange={(e) => setFilterMinPrice(Number(e.target.value))}
                    type="text"
                    className="min_price price-range-field price-input"
                    value={filterMinPrice}
                  />
                  <span className="d-inline-block ms-2 me-2 fw-bold">-</span>
                  <input
                    type="text"
                    onChange={(e) => setFilterMaxPrice(Number(e.target.value))}
                    className="max_price price-range-field price-input"
                    value={filterMaxPrice}
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    resetFilters();
                  }}
                  type="button"
                  className="btn btn-primary btn-sm mt-3"
                >
                  Reset
                </button>
              </form>
            </div>
          </div>

          <div className="sidebar-widget tags-widget py-5 px-4 bg-white">
            <div className="widget-title d-flex">
              <h6 className="mb-0">Brands</h6>
              <span className="hr-line w-100 position-relative d-block align-self-end ms-1"></span>
            </div>
            <div className="mt-4 d-flex gap-2 flex-wrap">
              {brands?.map((brand, i) => (
                <Link
                  key={i}
                  href={`/products/brands=${brand.name
                    ?.replace(/\s+/g, "")
                    .toLowerCase()}=${brand._id}`}
                  className="btn btn-outline btn-sm"
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopGridSidebar;

