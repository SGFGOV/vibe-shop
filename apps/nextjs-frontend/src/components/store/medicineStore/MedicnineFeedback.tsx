"use client";

import React from "react";

interface MedicineFeedbackProps {
  setting?: {
    medicine_client_say_title?: string;
    medicine_client_one_img?: string;
    medicine_client_one_comment?: string;
    medicine_client_one_avatar?: string;
    medicine_client_one_name?: string;
    medicine_client_two_img?: string;
    medicine_client_two_comment?: string;
    medicine_client_two_avatar?: string;
    medicine_client_two_name?: string;
  };
}

const MedicineFeedback = ({ setting }: MedicineFeedbackProps) => {
  return (
    <div className="feedback-section section-space-sm-y">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <h2 className="mb-0 display-6">
                {setting?.medicine_client_say_title}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row g-4 g-lg-0 align-items-center">
          <div className="col-lg-6">
            <img
              src={setting?.medicine_client_one_img}
              alt="image"
              className="img-fluid"
            />
          </div>
          <div className="col-lg-6">
            <div className="p-6">
              <ul className="list list--row gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <li key={idx}>
                    <span className="meat-card__star d-inline-block fs-24">
                      <i className="fas fa-star"></i>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mb-8 fs-20 fw-medium">
                {setting?.medicine_client_one_comment}
              </p>
              <div className="d-flex align-items-center gap-6">
                <div className="w-16 h-16 rounded-circle overflow-hidden flex-shrink-0">
                  <img
                    src={setting?.medicine_client_one_avatar}
                    alt="image"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 fs-24">
                    {setting?.medicine_client_one_name}
                  </h6>
                  <p className="mb-0">UI Designer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-4 order-lg-3">
            <div className="p-6">
              <ul className="list list--row justify-content-lg-end gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <li key={idx}>
                    <span className="meat-card__star d-inline-block fs-24">
                      <i className="fas fa-star"></i>
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mb-8 fs-20 fw-medium text-lg-end">
                {setting?.medicine_client_two_comment}
              </p>
              <div className="d-flex align-items-center flex-lg-row-reverse gap-6">
                <div className="w-16 h-16 rounded-circle overflow-hidden flex-shrink-0">
                  <img
                    src={setting?.medicine_client_two_avatar}
                    alt="image"
                    className="img-fluid w-100 h-100 object-fit-cover"
                  />
                </div>
                <div className="flex-grow-1">
                  <h6 className="mb-0 fs-24 text-lg-end">
                    {setting?.medicine_client_two_name}
                  </h6>
                  <p className="mb-0 text-lg-end">UI Designer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 order-3 order-lg-4">
            <img
              src={setting?.medicine_client_two_img}
              alt="image"
              className="img-fluid"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineFeedback;

