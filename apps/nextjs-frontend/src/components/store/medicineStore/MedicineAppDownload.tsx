"use client";

import React from "react";

interface MedicineAppDownloadProps {
  setting?: {
    medicine_download_app_title?: string;
    medicine_download_app_text?: string;
    medicine_download_app_img?: string;
  };
}

const MedicineAppDownload = ({ setting }: MedicineAppDownloadProps) => {
  return (
    <div className="section-space-sm-top section-space-bottom">
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-lg-6">
            <h2 className="mb-5 display-6">
              {setting?.medicine_download_app_title}
            </h2>
            <p className="fs-18 mb-10">
              {setting?.medicine_download_app_text}
            </p>
            <div className="d-flex align-items-center gap-4 flex-wrap">
              <a
                href="#"
                className="link button button-sm button--primary align-items-center gap-3 px-6 flex-shrink-0"
              >
                <span className="d-inline-block flex-shrink-0 fs-32 lh-1">
                  <i className="fab fa-google-play"></i>
                </span>
                <span className="flex-grow-1">
                  <span className="d-inline-block fs-12">Get it on</span>
                  <span className="d-block fw-bold">Google Play</span>
                </span>
              </a>
              <a
                href="#"
                className="link button button-sm button--secondary align-items-center gap-3 px-6 flex-shrink-0"
              >
                <span className="d-inline-block flex-shrink-0 fs-32 lh-1">
                  <i className="fab fa-apple"></i>
                </span>
                <span className="flex-grow-1">
                  <span className="d-inline-block fs-12">Download on the</span>
                  <span className="d-block fw-bold">App Store</span>
                </span>
              </a>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="text-center">
              <img
                src={setting?.medicine_download_app_img}
                alt="image"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineAppDownload;

