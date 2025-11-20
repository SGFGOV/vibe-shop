"use client";

import React, { useState } from "react";
import FurnitureProductCard from "./FurnitureProductCard";
import Link from "next/link";
import { Category, Product } from "@/types";

interface CategoryTab {
  id: string;
  label: string;
  value: string;
  count?: number;
}

interface FurnitureFeatureProps {
  setting?: {
    home3?: {
      furniture_feature_collection_categorys?: CategoryTab[];
      furniture_banner_four_img?: string;
      furniture_banner_four_sub_title?: string;
      furniture_banner_four_title?: string;
      furniture_banner_four_des?: string;
      furniture_banner_btn_four_link?: string;
      furniture_banner_btn_four_title?: string;
      furniture_banner_five_img?: string;
      furniture_banner_five_sub_title?: string;
      furniture_banner_five_title?: string;
      furniture_banner_btn_five_title?: string;
    };
  };
  categorys?: Category[];
  products?: Product[];
}

const FurnitureFeature = ({
  setting,
  categorys,
  products,
}: FurnitureFeatureProps) => {
  const [activeTab, setActiveTab] = useState<CategoryTab>(
    setting?.home3?.furniture_feature_collection_categorys?.[0] || {
      id: "",
      label: "",
      value: "",
    }
  );

  const filteredProducts = products?.filter(
    (product) => product?.category === activeTab.value
  );

  return (
    <>
      <div className="featured-section section-space-top section-space-sm-bottom">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row g-4 justify-content-lg-between align-items-center">
              <div className="col-lg-6">
                <h2 className="mb-0 display-6">Featured Collections</h2>
              </div>
              <div className="col-lg-6 col-xl-5">
                <p className="mb-0">
                  Globally drive principle-centered strategic theme areas
                  vis-a-vis goal-oriented best practices state of the
                  Dynamically.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-4">
            <div className="col-12">
              <div className="list-group flex-row flex-wrap featured-nav gap-4 gap-md-6 mb-12">
                {setting?.home3?.furniture_feature_collection_categorys?.map(
                  (item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`link featured-nav__link fw-bold clr-heading ${
                        activeTab.label === item.label ? "active" : ""
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveTab(item);
                      }}
                    >
                      {item.label}
                      <span className="featured-nav__link-count">
                        {item.count}
                        {
                          products?.filter(
                            (p) =>
                              p.category?.replace(/\s+/g, "").toLowerCase() ===
                              `${item.label.replace(/\s+/g, "").toLowerCase()}`
                          ).length
                        }
                      </span>
                    </a>
                  )
                )}

                <Link
                  href="/products"
                  className="link d-inline-flex justify-content-center align-items-center gap-1 clr-heading :clr-secondary ms-md-auto"
                >
                  <span className="d-inline-block fw-bold">All Furniture</span>
                  <span className="d-inline-block clr-secondary">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
              <div className="tab-content">
                <div className="tab-pane fade show active" id="gaming-chair">
                  <div className="row g-4">
                    {filteredProducts?.map((product) => (
                      <FurnitureProductCard
                        key={product._id}
                        product={product}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="product-banner">
                <img
                  src={setting?.home3?.furniture_banner_four_img}
                  alt="image"
                  className="img-fluid w-100"
                />
                <div className="product-banner__overlay">
                  <span className="product-banner__subtitle">
                    <span className="fw-bold clr-secondary">
                      {setting?.home3?.furniture_banner_four_sub_title}
                    </span>
                  </span>
                  <h3 className="product-banner__title">
                    {setting?.home3?.furniture_banner_four_title}
                  </h3>
                  <p className="product-banner__info clr-heading">
                    {setting?.home3?.furniture_banner_four_des}
                  </p>
                  <Link
                    href={setting?.home3?.furniture_banner_btn_four_link || "#"}
                    className="link button button--secondary button-effect button-effect--dark"
                  >
                    <span className="d-inline-block fw-semibold">
                      {setting?.home3?.furniture_banner_btn_four_title}
                    </span>
                    <span className="d-inline-block">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="product-banner">
                <img
                  src={setting?.home3?.furniture_banner_five_img}
                  alt="image"
                  className="img-fluid w-100"
                />
                <div className="product-banner__overlay">
                  <span className="d-block fs-18">
                    <span className="fw-bold clr-secondary">
                      {setting?.home3?.furniture_banner_five_sub_title}
                    </span>
                  </span>
                  <h3 className="fs-32">
                    {setting?.home3?.furniture_banner_five_title}
                  </h3>
                  <Link
                    href={setting?.home3?.furniture_banner_btn_four_link || "#"}
                    className="link button button--primary button-md button-effect button-effect--dark"
                  >
                    <span className="d-inline-block fw-semibold">
                      {setting?.home3?.furniture_banner_btn_five_title}
                    </span>
                    <span className="d-inline-block">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FurnitureFeature;

