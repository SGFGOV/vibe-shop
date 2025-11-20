"use client";

import Link from "next/link";
import StarRating from "../common/others/StartRating";
import { Product } from "@/types";

interface FurnitureFeatureBrandProps {
  setting?: {
    home3?: {
      furniture_featured_brand?: string;
      furniture_featured_brand_title?: string;
      furniture_featured_brand_description?: string;
      furniture_featured_brand_banner_img?: string;
      furniture_featured_brand_banner_title?: string;
      furniture_featured_brand_banner_description?: string;
      furniture_subscribe_img?: string;
      furniture_subscribe_title?: string;
      furniture_subscribe_btn?: string;
    };
  };
  products?: Product[];
}

const FurnitureFeatureBrand = ({
  setting,
  products,
}: FurnitureFeatureBrandProps) => {
  const featureBrandProduct = products?.filter(
    (p) => p.brand === setting?.home3?.furniture_featured_brand
  );

  return (
    <>
      <div className="section-space-sm-y three-bg">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-xl-7">
                <h2 className="display-6 text-center">
                  {setting?.home3?.furniture_featured_brand_title}
                </h2>
                <p className="mb-0 text-center">
                  {setting?.home3?.furniture_featured_brand_description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row g-4">
              <div className="col-md-6 col-lg-4">
                <ul className="list gap-4 gap-xxl-8">
                  {featureBrandProduct?.slice(0, 3).map((product) => (
                    <li key={product._id}>
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
                              alt="image"
                              className="img-fluid w-100 h-100 object-fit-contain"
                            />
                          </Link>
                        </div>
                        <div className="meat-card__body">
                          <ul className="list list--row mb-2">
                            <StarRating rating={product?.averageRating} />
                          </ul>
                          <h6 className="meat-card__title">
                            <Link
                              href={`/product-details/${product._id}`}
                              className="link meat-card__title-link"
                            >
                              {product?.name}
                            </Link>
                          </h6>
                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 my-2">
                            <div className="d-flex align-items-center gap-3">
                              {product?.prices?.originalPrice &&
                                product.prices.originalPrice >
                                  (product.prices?.price || 0) && (
                                  <h6 className="meat-card__pre-price text-decoration-line-through mb-0">
                                    ${product.prices.originalPrice}.00
                                  </h6>
                                )}
                              <h6 className="meat-card__current-price mb-0">
                                ${product.prices?.price || 0}.00
                              </h6>
                            </div>
                          </div>
                          <Link
                            href="/products"
                            className="link d-inline-flex text-center justify-content-center align-items-center fs-14 gap-2 clr-heading :clr-secondary"
                          >
                            <span className="d-inline-block fw-semibold">
                              Shop Now
                            </span>
                            <span className="d-inline-block">
                              <i className="fas fa-arrow-right"></i>
                            </span>
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-md-6 col-lg-4 order-md-3 order-xl-2">
                <div className="product-banner px-xxl-4">
                  <img
                    src={setting?.home3?.furniture_featured_brand_banner_img}
                    alt="image"
                    className="img-fluid w-100"
                  />
                  <div className="product-banner__overlay">
                    <span className="product-banner__subtitle">
                      <span className="fw-bold clr-secondary">
                        {setting?.home3?.furniture_featured_brand_banner_title}
                      </span>
                    </span>
                    <h3 className="product-banner__title">
                      {setting?.home3?.furniture_featured_brand_banner_description}
                    </h3>
                    <Link
                      href="/products"
                      className="link button button-effect button-effect--dark"
                    >
                      <span className="d-inline-block fw-semibold">
                        Shop Now
                      </span>
                      <span className="d-inline-block">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-4 order-md-2 order-xl-3">
                <ul className="list gap-4 gap-xxl-8">
                  {featureBrandProduct?.slice(4, 7).map((product) => (
                    <li key={product._id}>
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
                              alt="image"
                              className="img-fluid w-100 h-100 object-fit-contain"
                            />
                          </Link>
                        </div>
                        <div className="meat-card__body">
                          <ul className="list list--row mb-2">
                            <StarRating rating={product?.averageRating} />
                          </ul>
                          <h6 className="meat-card__title">
                            <Link
                              href={`/product-details/${product._id}`}
                              className="link meat-card__title-link"
                            >
                              {product?.name}
                            </Link>
                          </h6>
                          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 my-2">
                            <div className="d-flex align-items-center gap-3">
                              {product?.prices?.originalPrice &&
                                product.prices.originalPrice >
                                  (product.prices?.price || 0) && (
                                  <h6 className="meat-card__pre-price text-decoration-line-through mb-0">
                                    ${product.prices.originalPrice}.00
                                  </h6>
                                )}
                              <h6 className="meat-card__current-price mb-0">
                                ${product.prices?.price || 0}.00
                              </h6>
                            </div>
                          </div>
                          <a
                            href="#"
                            className="link d-inline-flex text-center justify-content-center align-items-center fs-14 gap-2 clr-heading :clr-secondary"
                          >
                            <span className="d-inline-block fw-semibold">
                              Shop Now
                            </span>
                            <span className="d-inline-block">
                              <i className="fas fa-arrow-right"></i>
                            </span>
                          </a>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="product-banner">
                <img
                  src={setting?.home3?.furniture_subscribe_img}
                  alt="image"
                  className="img-fluid w-100"
                />
                <div className="product-banner__overlay d-flex flex-column justify-content-center">
                  <h3 className="fs-32 max-text-20 fw-bolder mb-6">
                    {setting?.home3?.furniture_subscribe_title}
                  </h3>
                  <div className="input-group newsletter newsletter--secondary ms-0">
                    <input
                      type="text"
                      className="form-control newsletter__input"
                      placeholder="Enter Email Address"
                    />
                    <span className="input-group-text newsletter__btn">
                      {setting?.home3?.furniture_subscribe_btn}
                    </span>
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

export default FurnitureFeatureBrand;

