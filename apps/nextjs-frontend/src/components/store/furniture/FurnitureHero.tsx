"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper";
import Link from "next/link";

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  img: string;
}

interface FurnitureHeroProps {
  setting?: {
    home3?: {
      furniture_slider_one_subtitle?: string;
      furniture_slider_one_title?: string;
      furniture_slider_one_img?: string;
      furniture_slider_two_subtitle?: string;
      furniture_slider_two_title?: string;
      furniture_slider_two_img?: string;
      furniture_slider_three_subtitle?: string;
      furniture_slider_three_title?: string;
      furniture_slider_three_img?: string;
    };
  };
}

const FurnitureHero = ({ setting }: FurnitureHeroProps) => {
  const slides: Slide[] = [
    {
      id: 1,
      title: setting?.home3?.furniture_slider_one_subtitle || "",
      subtitle: setting?.home3?.furniture_slider_one_title || "",
      img: setting?.home3?.furniture_slider_one_img || "",
    },
    {
      id: 2,
      title: setting?.home3?.furniture_slider_two_subtitle || "",
      subtitle: setting?.home3?.furniture_slider_two_title || "",
      img: setting?.home3?.furniture_slider_two_img || "",
    },
    {
      id: 3,
      title: setting?.home3?.furniture_slider_three_subtitle || "",
      subtitle: setting?.home3?.furniture_slider_three_title || "",
      img: setting?.home3?.furniture_slider_three_img || "",
    },
  ];

  return (
    <>
      <div className="hero-7">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          autoplay={{
            delay: 5000,
          }}
          speed={700}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          pagination={{
            el: ".hero-7__pagination",
            type: "bullets",
            clickable: true,
          }}
          className="hero-7__slider"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="hero-7__slider-item">
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      <div className="hero-7__slider-inner">
                        <div className="row">
                          <div className="col-lg-6">
                            <h1 className="hero-7__slider-title mb-12">
                              {slide.title}{" "}
                              <span className="d-inline-block clr-primary text-decoration">
                                {slide.subtitle}
                                <svg
                                  width="350"
                                  height="18"
                                  className="text-decoration__img"
                                  viewBox="0 0 350 18"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path d="M0.760582 17.8078C58.2735 11.9812 115.591 6.4118 174.037 5.89076C231.128 5.36082 287.619 7.7998 344.092 12.953C350.861 13.5145 350.908 6.40578 344.14 5.71507C286.505 0.554238 227.686 -0.995243 169.616 1.33782C113.094 3.55181 55.3997 7.56765 0.569619 17.4188C0.181752 17.5455 0.373564 17.8052 0.760582 17.8078Z" />
                                </svg>
                              </span>
                            </h1>
                            <p className="hero-7__slider-para fs-18 mb-12 text-wrap-balance">
                              Assertively target market-driven intellectual
                              capital with worldwide human is simply free text
                              quiz Bibendum holistic.
                            </p>
                            <Link
                              href="/products"
                              className="link button button-effect button-effect--primary"
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
                    </div>
                  </div>
                </div>
                <div className="hero-7__slider-img d-none d-lg-block">
                  <img
                    src={slide.img}
                    alt="slider"
                    className="img-fluid w-100 h-100 object-fit-contain"
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination hero-7__pagination"></div>
      </div>
    </>
  );
};

export default FurnitureHero;

