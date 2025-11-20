"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

interface HalalFeedbackProps {
  setting?: {
    home2?: {
      halal_food_our_client_say_title?: string;
      halal_food_our_client_say_sub_title?: string;
      halal_food_client_one_name?: string;
      halal_food_client_one_img?: string;
      halal_food_client_one_comment?: string;
      halal_food_client_two_name?: string;
      halal_food_client_two_img?: string;
      halal_food_client_two_comment?: string;
      halal_food_client_three_name?: string;
      halal_food_client_three_img?: string;
      halal_food_client_three_comment?: string;
      halal_food_client_four_name?: string;
      halal_food_client_four_img?: string;
      halal_food_client_four_comment?: string;
      halal_food_client_five_name?: string;
      halal_food_client_five_img?: string;
      halal_food_client_five_comment?: string;
    };
  };
}

interface Testimonial {
  name: string;
  image: string;
  rating: number;
  text: string;
}

const HalalFeedback = ({ setting }: HalalFeedbackProps) => {
  const testimonials: Testimonial[] = [
    {
      name: setting?.home2?.halal_food_client_one_name || "",
      image: setting?.home2?.halal_food_client_one_img || "",
      rating: 5,
      text: setting?.home2?.halal_food_client_one_comment || "",
    },
    {
      name: setting?.home2?.halal_food_client_two_name || "",
      image: setting?.home2?.halal_food_client_two_img || "",
      rating: 5,
      text: setting?.home2?.halal_food_client_two_comment || "",
    },
    {
      name: setting?.home2?.halal_food_client_three_name || "",
      image: setting?.home2?.halal_food_client_three_img || "",
      rating: 5,
      text: setting?.home2?.halal_food_client_three_comment || "",
    },
    {
      name: setting?.home2?.halal_food_client_four_name || "",
      image: setting?.home2?.halal_food_client_four_img || "",
      rating: 5,
      text: setting?.home2?.halal_food_client_four_comment || "",
    },
    {
      name: setting?.home2?.halal_food_client_five_name || "",
      image: setting?.home2?.halal_food_client_five_img || "",
      rating: 5,
      text: setting?.home2?.halal_food_client_five_comment || "",
    },
  ].filter((t) => t.name && t.image && t.text);

  return (
    <section className="section-space-sm-y">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-xl-6 col-xxl-5">
              <h2 className="mb-0 text-center display-6">
                {setting?.home2?.halal_food_our_client_say_title}
                <span className="meat-primary">
                  {setting?.home2?.halal_food_our_client_say_sub_title}
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xl-10">
            <div
              className="meat-feedback-slider-container"
              style={{ zIndex: 100 }}
            >
              <Swiper
                modules={[Pagination]}
                pagination={{
                  el: ".meat-feedback-slider-container__pagination",
                  clickable: true,
                }}
                spaceBetween={30}
                breakpoints={{
                  992: { slidesPerView: 1 },
                  1200: { slidesPerView: 2 },
                }}
                className="swiper meat-feedback-slider"
              >
                {testimonials.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="meat-feedback bg-white px-6 py-10">
                      <div className="d-flex align-items-center gap-4 mb-6">
                        <div className="w-13 h-13 rounded-circle overflow-hidden flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="img-fluid w-100 h-100 object-fit-cover"
                          />
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="mb-0">{item.name}</h6>
                          <ul className="list list--row gap-1">
                            {[...Array(item.rating)].map((_, i) => (
                              <li key={i}>
                                <span className="d-inline-block fs-14 clr-warning">
                                  <i className="fas fa-star"></i>
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <p className="mb-0">{item.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
                <div className="swiper-pagination meat-feedback-slider-container__pagination mt-8"></div>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HalalFeedback;

