"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import Link from "next/link";
import useAddToCart from "../hooks/useAddToCart";
import { Product } from "@/types";

interface Tab {
  id: string;
  label: string;
  value: string;
}

interface HalalMeatBestSellersProps {
  setting?: {
    halal_meat_most_popular_product_categorys?: string[];
  };
  products?: Product[];
}

const HalalMeatBestSellers = ({
  setting,
  products,
}: HalalMeatBestSellersProps) => {
  const [activeTab, setActiveTab] = useState<string>("");
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<
    Record<string, Product[]>
  >({});
  const { handelAddItem } = useAddToCart();

  useEffect(() => {
    if (setting?.halal_meat_most_popular_product_categorys) {
      const categoryTabs = setting.halal_meat_most_popular_product_categorys.map(
        (category) => {
          const id = category.trim().toLowerCase().replace(/\s+/g, "-");
          return {
            id,
            label: category.trim(),
            value: category.trim(),
          };
        }
      );

      setTabs(categoryTabs);

      if (categoryTabs.length > 0) {
        setActiveTab(categoryTabs[0].id);
      }
    }
  }, [setting]);

  useEffect(() => {
    if (products && tabs.length > 0) {
      const productsByCategory: Record<string, Product[]> = {};
      tabs.forEach((tab) => {
        productsByCategory[tab.id] = products.filter(
          (product) => product.category === tab.value
        );
      });
      setFilteredProducts(productsByCategory);
    }
  }, [products, tabs]);

  const renderProductSlider = (products: Product[]) => {
    if (!products || products.length === 0) {
      return (
        <div className="text-center py-5">
          No products found in this category
        </div>
      );
    }

    return (
      <div className="tab-pane fade show active">
        <button
          type="button"
          className="hl-product-slider-prev hl-product-slider-btn"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <button
          type="button"
          className="hl-product-slider-next hl-product-slider-btn"
        >
          <i className="fas fa-arrow-right"></i>
        </button>
        <div className="swiper hl-products-slider pb-4">
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".hl-product-slider-prev",
              nextEl: ".hl-product-slider-next",
            }}
            slidesPerView={4}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1 },
              576: { slidesPerView: 2 },
              992: { slidesPerView: 3 },
              1200: { slidesPerView: 4 },
            }}
            className="hl-products-slider p-4"
          >
            {products.map((product) => (
              <SwiperSlide
                key={product._id}
                className="hl-collection-single bg-white rounded position-relative h-100"
              >
                <div className="feature-image text-center">
                  <Link href={`/product-details/${product._id}`}>
                    <img
                      src={
                        Array.isArray(product.image)
                          ? product.image[0]
                          : product.image || ""
                      }
                      alt={product.name || ""}
                      className="img-fluid"
                    />
                  </Link>
                </div>
                <div>
                  <span className="hlp-tagline text-danger fs-xs fw-bold d-block mb-1">
                    {product.category}
                  </span>
                  <Link
                    href={`/product-details/${product._id}`}
                    className="product-title"
                  >
                    {product.name}
                  </Link>
                  <div className="d-flex align-items-center gap-1 mt-2">
                    <ul className="rating-star fs-xs d-inline-flex align-items-center text-warning">
                      {[...Array(Math.floor(product.averageRating || 0))].map(
                        (_, i) => (
                          <li key={i}>
                            <i className="fas fa-star"></i>
                          </li>
                        )
                      )}
                    </ul>
                    <span className="fs-xs">
                      {(product.ratings as unknown[])?.length || 0} Reviews
                    </span>
                  </div>
                  <div className="d-flex align-items-center mt-3">
                    {product.prices?.originalPrice &&
                      product.prices.originalPrice >
                        (product.prices?.price || 0) && (
                        <del className="fw-bold me-2">
                          ${product.prices.originalPrice}.00
                        </del>
                      )}
                    <span className="text-danger fw-bold">
                      ${product.prices?.price || 0}.00
                    </span>
                  </div>
                </div>
                <a
                  type="button"
                  onClick={() =>
                    handelAddItem({ ...product, id: product._id || product.id })
                  }
                  className="cart-btn"
                >
                  <svg
                    width="20"
                    height="24"
                    viewBox="0 0 20 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.86446 6.31254H3.42525C2.43074 6.31254 1.60525 7.08117 1.53429 8.0735L0.605877 21.0735C0.568502 21.5984 0.750494 22.1151 1.10908 22.5003C1.4682 22.8854 1.97033 23.1042 2.49683 23.1042H17.5032C18.0297 23.1042 18.5318 22.8854 18.8909 22.5003C19.2495 22.1151 19.4315 21.5984 19.3941 21.0735L18.4657 8.0735C18.3947 7.08117 17.5692 6.31254 16.5747 6.31254H15.1458V6.04171C15.1458 3.19958 12.8421 0.895874 10 0.895874C7.26187 0.895874 4.7312 3.07662 4.85416 6.04171C4.85795 6.13162 4.86121 6.22208 4.86446 6.31254ZM15.1458 7.93754V12C15.1458 12.4485 14.7818 12.8125 14.3333 12.8125C13.8848 12.8125 13.5208 12.4485 13.5208 12V7.93754H6.47916V12C6.47916 12.4485 6.11516 12.8125 5.66666 12.8125C5.21816 12.8125 4.85416 12.4485 4.85416 12C4.85416 12 4.92458 10.1015 4.90129 7.93754H3.42525C3.28333 7.93754 3.16525 8.04749 3.1555 8.18887L2.22653 21.1889C2.22111 21.2642 2.24713 21.3378 2.29859 21.3931C2.35004 21.4478 2.42154 21.4792 2.49683 21.4792H17.5032C17.5785 21.4792 17.65 21.4478 17.7014 21.3931C17.7529 21.3378 17.7789 21.2642 17.7735 21.1889L16.8445 8.18887C16.8347 8.04749 16.7167 7.93754 16.5747 7.93754H15.1458ZM13.5208 6.31254V6.04171C13.5208 4.09712 11.9446 2.52087 10 2.52087C8.05541 2.52087 6.47916 4.09712 6.47916 6.04171V6.31254H13.5208Z"
                      fill="white"
                    />
                  </svg>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    );
  };

  if (tabs.length === 0) {
    return null;
  }

  return (
    <section className="hl-filter-area pt-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-6">
            <div className="text-center">
              <span className="hl-subtitle fw-bold d-inline-block">
                Best For You
              </span>
              <h2 className="mb-8 mt-2">Shop Best Sellers</h2>
            </div>
          </div>
        </div>
        <div className="hl-filter">
          <ul className="nav nav-tabs border-bottom-0">
            {tabs.map((tab, i) => (
              <li key={i}>
                <a
                  type="button"
                  className={`${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="tab-content mt-6 position-relative">
            {activeTab &&
              filteredProducts[activeTab] &&
              renderProductSlider(filteredProducts[activeTab])}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HalalMeatBestSellers;

