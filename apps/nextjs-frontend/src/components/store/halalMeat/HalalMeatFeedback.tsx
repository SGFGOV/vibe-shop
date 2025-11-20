"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";

interface HalalMeatFeedbackProps {
  setting?: {
    halal_meat_client_one_comment?: string;
    halal_meat_client_one_name?: string;
    halal_meat_client_one_rating?: string;
    halal_meat_client_two_comment?: string;
    halal_meat_client_two_name?: string;
    halal_meat_client_two_rating?: string;
    halal_meat_client_three_comment?: string;
    halal_meat_client_three_name?: string;
    halal_meat_client_three_rating?: string;
    halal_meat_client_four_comment?: string;
    halal_meat_client_four_name?: string;
    halal_meat_client_four_rating?: string;
    halal_meat_client_five_comment?: string;
    halal_meat_client_five_name?: string;
    halal_meat_client_five_rating?: string;
  };
}

interface Feedback {
  id: number;
  text: string;
  name: string;
  rating: number;
}

export default function HalalMeatFeedback({
  setting,
}: HalalMeatFeedbackProps) {
  const feedbacks: Feedback[] = [
    {
      id: 1,
      text: setting?.halal_meat_client_one_comment || "",
      name: setting?.halal_meat_client_one_name || "",
      rating: Number(setting?.halal_meat_client_one_rating || 0),
    },
    {
      id: 2,
      text: setting?.halal_meat_client_two_comment || "",
      name: setting?.halal_meat_client_two_name || "",
      rating: Number(setting?.halal_meat_client_two_rating || 0),
    },
    {
      id: 3,
      text: setting?.halal_meat_client_three_comment || "",
      name: setting?.halal_meat_client_three_name || "",
      rating: Number(setting?.halal_meat_client_three_rating || 0),
    },
    {
      id: 4,
      text: setting?.halal_meat_client_four_comment || "",
      name: setting?.halal_meat_client_four_name || "",
      rating: Number(setting?.halal_meat_client_four_rating || 0),
    },
    {
      id: 5,
      text: setting?.halal_meat_client_five_comment || "",
      name: setting?.halal_meat_client_five_name || "",
      rating: Number(setting?.halal_meat_client_five_rating || 0),
    },
  ].filter((f) => f.text && f.name && f.rating > 0);

  return (
    <section className="hl-feedback">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-5">
            <div className="text-center">
              <span className="hl-subtitle px-4 fw-bold">
                Customer Feedback
              </span>
              <h2 className="mb-0 mt-2">Our Satisfied Customer Feedback.</h2>
            </div>
          </div>
        </div>

        <div className="py-7">
          <Swiper
            modules={[Autoplay]}
            slidesPerView={3}
            spaceBetween={24}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            breakpoints={{
              0: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1200: { slidesPerView: 3 },
            }}
          >
            {feedbacks.map((f) => (
              <SwiperSlide key={f.id}>
                <div className="hl-feedback-single bg-white rounded py-5 px-4">
                  <p className="mb-3">{f.text}</p>
                  <div className="clients_info">
                    <h6 className="fs-md mb-1">{f.name}</h6>
                    <ul className="rating-star text-warning d-flex">
                      {[...Array(f.rating)].map((_, i) => (
                        <li key={i}>
                          <i className="fas fa-star"></i>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

