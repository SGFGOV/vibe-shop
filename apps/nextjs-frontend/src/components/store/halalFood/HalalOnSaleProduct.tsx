"use client";

import React, { useRef } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import StarRating from "../common/others/StartRating";
import Link from "next/link";
import { Product } from "@/types";

interface HalalOnSaleProductProps {
  setting?: {
    home2?: {
      halal_food_on_sale_product_banner_sub_title?: string;
      halal_food_on_sale_product_banner_title?: string;
      halal_food_on_sale_product_banner_link?: string;
      halal_food_on_sale_product_banner_link_text?: string;
      halal_food_on_sale_product_title?: string;
    };
  };
  products?: Product[];
}

const HalalOnSaleProduct = ({
  setting,
  products,
}: HalalOnSaleProductProps) => {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const halalProduct = products?.filter((product) =>
    product.theme?.includes("Halal Food")
  );
  const halalOnSaleProduct =
    halalProduct?.filter(
      (product) =>
        (product.prices?.originalPrice || 0) > (product.prices?.price || 0)
    ) || [];
  
  const grouped: Product[][] = [];
  for (let i = 0; i < halalOnSaleProduct.length; i += 2) {
    grouped.push(halalOnSaleProduct.slice(i, i + 6));
  }
  
  return (
    <>
      <div className="section-space-sm-y">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-4">
              <div className="on-sale-banner">
                <span className="d-inline-block meat-primary fs-14 fw-bold mb-2">
                  {setting?.home2?.halal_food_on_sale_product_banner_sub_title}
                </span>
                <h2 className="display-6 clr-white mb-8">
                  {setting?.home2?.halal_food_on_sale_product_banner_title}
                </h2>
                <Link
                  href={setting?.home2?.halal_food_on_sale_product_banner_link || "#"}
                  className="meat-category-card__btn animated-btn-icon bg-primary-clr clr-white"
                >
                  <span className="meat-category-card__btn-text fw-medium">
                    {
                      setting?.home2
                        ?.halal_food_on_sale_product_banner_link_text
                    }
                  </span>
                  <span className="meat-category-card__btn-icon">
                    <i className="fas fa-arrow-right-long"></i>
                  </span>
                </Link>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="box-shadow rounded-1 section-space-sm-y px-4 px-lg-6 px-xl-8 bg-white">
                <div className="section-space-xsm-bottom">
                  <div className="row g-4 align-items-md-center">
                    <div className="col-md-8">
                      <h2 className="mb-0 display-6">
                        {setting?.home2?.halal_food_on_sale_product_title}
                      </h2>
                    </div>
                    <div className="col-md-4">
                      <div className="on-sale-slider__nav justify-content-md-end d-flex gap-2">
                        <button
                          ref={prevRef}
                          className="btn btn-outline-dark"
                        >
                          <i className="fas fa-chevron-left"></i>
                        </button>
                        <button
                          ref={nextRef}
                          className="btn btn-outline-dark"
                        >
                          <i className="fas fa-chevron-right"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row g-0">
                  <div className="col-12">
                    <div className="swiper on-sale-slider">
                      <div className="swiper-wrapper">
                        <Swiper
                          modules={[Navigation, Pagination]}
                          spaceBetween={20}
                          slidesPerView={1}
                          loop
                          navigation={{
                            prevEl: prevRef.current,
                            nextEl: nextRef.current,
                          }}
                          onBeforeInit={(swiper) => {
                            if (prevRef.current && nextRef.current && swiper.params.navigation && typeof swiper.params.navigation === 'object') {
                              swiper.params.navigation.prevEl = prevRef.current;
                              swiper.params.navigation.nextEl = nextRef.current;
                            }
                          }}
                        >
                          {grouped.map((group, index) => (
                            <SwiperSlide key={index}>
                              <div className="on-sale-slider__item">
                                <div className="row g-4">
                                  {group.map((product) => (
                                    <div className="col-md-6" key={product._id}>
                                      <div className="meat-card meat-card--row">
                                        <div className="meat-card__img text-center">
                                          <Link
                                            href={`/product-details/${product._id}`}
                                            className="link d-inline-block text-center"
                                          >
                                            <img
                                              src={
                                                Array.isArray(product.image)
                                                  ? product.image[0]
                                                  : product.image || ""
                                              }
                                              alt={product.name || ""}
                                              className="img-fluid w-100 h-100 object-fit-contain"
                                            />
                                          </Link>
                                        </div>
                                        <div className="meat-card__body">
                                          <span className="meat-card__subtitle">
                                            {product.category}
                                          </span>
                                          <h6 className="meat-card__title">
                                            <Link
                                              href={`/product-details/${product._id}`}
                                              className="link meat-card__title-link"
                                            >
                                              {product.name}
                                            </Link>
                                          </h6>
                                          <StarRating
                                            rating={product.averageRating}
                                          />
                                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-2">
                                            <div className="d-flex align-items-center gap-3">
                                              {product.prices?.originalPrice && (
                                                <h6 className="meat-card__pre-price text-decoration-line-through mb-0">
                                                  ${product.prices.originalPrice}
                                                </h6>
                                              )}
                                              <h6 className="meat-card__current-price mb-0">
                                                ${product.prices?.price || 0}
                                              </h6>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </SwiperSlide>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HalalOnSaleProduct;

