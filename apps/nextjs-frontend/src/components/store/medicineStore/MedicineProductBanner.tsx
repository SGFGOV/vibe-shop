"use client";

import React from "react";

interface MedicineProductBannerProps {
  setting?: {
    medicine_feature_one_sub_title?: string;
    medicine_feature_one_title?: string;
    medicine_feature_one_name?: string;
    medicine_feature_one_img?: string;
    medicine_feature_two_sub_title?: string;
    medicine_feature_two_title?: string;
    medicine_feature_two_name?: string;
    medicine_feature_two_img?: string;
    medicine_feature_three_sub_title?: string;
    medicine_feature_three_title?: string;
    medicine_feature_three_name?: string;
    medicine_feature_four_sub_title?: string;
    medicine_feature_four_title?: string;
    medicine_feature_four_name?: string;
    medicine_feature_four_img?: string;
  };
}

const MedicineProductBanner = ({
  setting,
}: MedicineProductBannerProps) => {
  return (
    <div className="section-space-top section-space-sm-bottom">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-6">
            <div className="product-banner product-banner--1 h-100 py-14 px-8 rounded-3">
              <span className="d-inline-block mb-6 rounded py-1 px-5 fs-14 fw-semibold clr-white one-bg">
                {setting?.medicine_feature_one_sub_title}
              </span>
              <span className="d-block mb-1 fs-18 fw-semibold clr-alt-text">
                {setting?.medicine_feature_one_title}
              </span>
              <h3 className="product-banner__title mb-12">
                {setting?.medicine_feature_one_name}
              </h3>
              <a
                href="#"
                className="link button button--primary button-effect button-effect--secondary"
              >
                <span className="d-inline-block fw-semibold"> Shop Now </span>
                <span className="d-inline-block">
                  <i className="fas fa-arrow-right"></i>
                </span>
              </a>
              <div className="product-banner__img">
                <img
                  src={setting?.medicine_feature_one_img}
                  alt="image"
                  className="img-fluid product-banner__img-is"
                />
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="row g-4">
              <div className="col-md-6">
                <div className="product-banner product-banner--2 h-100 pt-4 pb-20 px-4 rounded-3">
                  <span className="d-inline-block mb-4 rounded-pill py-1 px-5 fs-10 fw-semibold clr-white one-bg">
                    {setting?.medicine_feature_two_sub_title}
                  </span>
                  <span className="d-block mb-1 fs-12 fw-semibold clr-alt-text">
                    {setting?.medicine_feature_two_title}
                  </span>
                  <h3 className="product-banner__title mb-6">
                    {setting?.medicine_feature_two_name}
                  </h3>
                  <a
                    href="#"
                    className="link button button-sm button--two button-effect button-effect--secondary fs-12"
                  >
                    <span className="d-inline-block fw-semibold"> Buy Now </span>
                    <span className="d-inline-block">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </a>
                  <div className="product-banner__img">
                    <img
                      src={setting?.medicine_feature_two_img}
                      alt="image"
                      className="img-fluid product-banner__img-is"
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="rounded-3 h-100 px-6 py-8 secondary-bg">
                  <span className="d-block fw-bold fs-24 clr-light mb-1">
                    {setting?.medicine_feature_three_sub_title}
                  </span>
                  <h2 className="d-block fw-bold fs-32 clr-light mb-3">
                    {setting?.medicine_feature_three_title}
                  </h2>
                  <p className="mb-0 clr-light fs-14">
                    {setting?.medicine_feature_three_name}
                  </p>
                </div>
              </div>
              <div className="col-12">
                <div className="product-banner product-banner--3 h-100 pt-4 pb-20 px-4 rounded-3">
                  <span className="d-inline-block mb-4 rounded-pill py-1 px-5 fs-14 fw-semibold clr-white one-bg">
                    {setting?.medicine_feature_four_sub_title}
                  </span>
                  <span className="d-block mb-1 fs-18 fw-semibold clr-alt-text">
                    {setting?.medicine_feature_four_title}
                  </span>
                  <h3 className="product-banner__title mb-6">
                    {setting?.medicine_feature_four_name}
                  </h3>
                  <a
                    href="#"
                    className="link button button-md button--three button-effect button-effect--secondary"
                  >
                    <span className="d-inline-block fw-semibold"> Shop Now </span>
                    <span className="d-inline-block">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </a>
                  <div className="product-banner__img">
                    <img
                      src={setting?.medicine_feature_four_img}
                      alt="image"
                      className="img-fluid product-banner__img-is"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineProductBanner;

