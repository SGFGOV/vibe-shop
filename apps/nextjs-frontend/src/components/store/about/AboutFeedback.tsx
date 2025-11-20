"use client";

import React, { useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

interface Feedback {
  id: number;
  clientImage: string;
  name: string;
  review: string;
}

const AboutFeedback = () => {
  const feedbacks: Feedback[] = [
    {
      id: 1,
      clientImage: "/img/authors/client-1.png",
      name: "George Nakashima",
      review:
        '"Conveniently synergize premium collaboration and idea-sharing with compelling "outside the box" thinking. Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services. Objectively customize vertical."',
    },
    {
      id: 2,
      clientImage: "/img/authors/client-2.png",
      name: "George Nakashima",
      review:
        '"Conveniently synergize premium collaboration and idea-sharing with compelling "outside the box" thinking. Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services. Objectively customize vertical."',
    },
    {
      id: 3,
      clientImage: "/img/authors/client-3.png",
      name: "George Nakashima",
      review:
        '"Conveniently synergize premium collaboration and idea-sharing with compelling "outside the box" thinking. Interactivel product distinctive paradigms whereas one-to-one intellectual capital. resource sucking services. Objectively customize vertical."',
    },
  ];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <section className="feedback-section pt-100 pb-120 position-relative z-1 overflow-hidden service-section">
          <img
            src="/img/shapes/bg-shape-4.png"
            alt="bg shape"
            className="position-absolute start-0 bottom-0 w-100 z--1 bg-shape"
          />
          <div className="container">
            <div className="row align-items-center g-4">
              <div className="col-xl-7">
                <div className="clients_thumb">
                  <img
                    src="/img/about/clients.png"
                    alt="clients"
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="col-xl-5">
                <div className="feedback-slider-2">
                  <Swiper
                    modules={[Navigation]}
                    spaceBetween={24}
                    slidesPerView={1}
                    speed={700}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    navigation={{
                      prevEl: ".fd2-arrow-left",
                      nextEl: ".fd2-arrow-right",
                    }}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      1200: {
                        slidesPerView: 1,
                      },
                    }}
                  >
                    {feedbacks.map((feedback) => (
                      <SwiperSlide key={feedback.id}>
                        <div className="feedback-single-2">
                          <p className="mb-4">{feedback.review}</p>
                          <div className="d-flex align-items-center gap-3">
                            <div className="client-thumb">
                              <img
                                src={feedback.clientImage}
                                alt="client"
                                className="img-fluid rounded-circle"
                              />
                            </div>
                            <div className="client-info">
                              <h6 className="mb-1">{feedback.name}</h6>
                              <span className="fs-xs">Customer</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <div className="d-flex align-items-center gap-3 mt-4">
                    <button
                      type="button"
                      className="fd2-arrow-left feedback-arrow-btn"
                    >
                      <i className="fas fa-angle-left"></i>
                    </button>
                    <button
                      type="button"
                      className="fd2-arrow-right feedback-arrow-btn"
                    >
                      <i className="fas fa-angle-right"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AboutFeedback;

