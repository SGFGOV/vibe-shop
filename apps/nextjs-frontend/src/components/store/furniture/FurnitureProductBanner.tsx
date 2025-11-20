"use client";

import Link from "next/link";
import React from "react";

interface FurnitureProductBannerProps {
  setting?: {
    home3?: {
      furniture_banner_one_img?: string;
      furniture_banner_one_sub_title?: string;
      furniture_banner_one_title?: string;
      furniture_banner_one_des?: string;
      furniture_banner_btn_one_link?: string;
      furniture_banner_btn_one_title?: string;
      furniture_banner_two_img?: string;
      furniture_banner_two_sub_title?: string;
      furniture_banner_two_title?: string;
      furniture_banner_two_des?: string;
      furniture_banner_btn_two_link?: string;
      furniture_banner_btn_two_title?: string;
      furniture_banner_three_img?: string;
      furniture_banner_three_sub_title?: string;
      furniture_banner_three_title?: string;
      furniture_banner_three_des?: string;
      furniture_banner_btn_three_link?: string;
      furniture_banner_btn_three_title?: string;
    };
  };
}

const FurnitureProductBanner = ({
  setting,
}: FurnitureProductBannerProps) => {
  return (
    <div className="section-space-sm-top section-space-bottom">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="product-banner">
              <img
                src={setting?.home3?.furniture_banner_one_img}
                alt="image"
                className="img-fluid w-100"
              />
              <div className="product-banner__overlay text-center">
                <span className="product-banner__subtitle clr-light">
                  <span className="fw-bold clr-secondary">
                    {setting?.home3?.furniture_banner_one_sub_title}
                  </span>
                </span>
                <h3 className="product-banner__title clr-light">
                  {setting?.home3?.furniture_banner_one_title}
                </h3>
                <p className="product-banner__info clr-light">
                  {setting?.home3?.furniture_banner_one_des}
                </p>
                <Link
                  href={setting?.home3?.furniture_banner_btn_one_link || "#"}
                  className="link button button--two button-effect button-effect--secondary"
                >
                  <span className="d-inline-block fw-semibold">
                    {setting?.home3?.furniture_banner_btn_one_title}
                  </span>
                  <span className="d-inline-block">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="product-banner">
              <img
                src={setting?.home3?.furniture_banner_two_img}
                alt="image"
                className="img-fluid w-100"
              />
              <div className="product-banner__overlay">
                <span className="product-banner__subtitle">
                  <span className="fw-bold clr-secondary">
                    {setting?.home3?.furniture_banner_two_sub_title}
                  </span>
                </span>
                <h3 className="product-banner__title">
                  {setting?.home3?.furniture_banner_two_title}
                </h3>
                <p className="product-banner__info">
                  {setting?.home3?.furniture_banner_two_des}
                </p>
                <Link
                  href={setting?.home3?.furniture_banner_btn_two_link || "#"}
                  className="link button button-effect button-effect--primary"
                >
                  <span className="d-inline-block fw-semibold">
                    {setting?.home3?.furniture_banner_btn_two_title}
                  </span>
                  <span className="d-inline-block">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 d-none d-md-block">
            <div className="product-banner">
              <img
                src={setting?.home3?.furniture_banner_three_img}
                alt="image"
                className="img-fluid w-100"
              />
              <div className="product-banner__overlay">
                <span className="product-banner__subtitle">
                  <span className="fw-bold clr-secondary">
                    {setting?.home3?.furniture_banner_three_sub_title}
                  </span>
                </span>
                <h3 className="product-banner__title">
                  {setting?.home3?.furniture_banner_three_title}
                </h3>
                <p className="product-banner__info">
                  {setting?.home3?.furniture_banner_three_des}
                </p>
                <Link
                  href={setting?.home3?.furniture_banner_btn_three_link || "#"}
                  className="link button button--dark button-effect button-effect--secondary"
                >
                  <span className="d-inline-block fw-semibold">
                    {setting?.home3?.furniture_banner_btn_three_title}
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
  );
};

export default FurnitureProductBanner;

