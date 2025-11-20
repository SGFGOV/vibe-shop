"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import { Category } from "@/types";

interface HalalFoodCategoryProps {
  categorys?: Category[];
  setting?: {
    home2?: {
      halal_food_category_title?: string;
    };
  };
}

export default function HalalFoodCategory({
  categorys,
  setting,
}: HalalFoodCategoryProps) {
  const halalCategory = categorys?.filter((cat) =>
    cat.theme?.includes("Halal Food")
  );
  const title = setting?.home2?.halal_food_category_title || "";
  const words = title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");
  
  return (
    <section className="section-space-y ptb-120">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="section-heading text-center mb-5">
              <h2 className="display-6 fw-bolder">
                {firstPart}{" "}
                <mark className="bg-transparent meat-primary">{lastWord}</mark>
              </h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="meat-category-slider-container">
              <Swiper
                modules={[Pagination]}
                pagination={{
                  el: ".meat-category-slider__pagination",
                  clickable: true,
                }}
                spaceBetween={30}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  576: { slidesPerView: 2 },
                  992: { slidesPerView: 3 },
                  1200: { slidesPerView: 4 },
                }}
                className="meat-category-slider"
              >
                {halalCategory?.map(({ _id, name, description, icon }) => (
                  <SwiperSlide key={_id}>
                    <div className="meat-category-card">
                      <div className="meat-category-card__icon">
                        <div className="meat-category-card__icon-is">
                          <Image
                            src={icon || ""}
                            alt={name || ""}
                            width={80}
                            height={80}
                            className="img-fluid mx-auto"
                          />
                        </div>
                      </div>
                      <div className="meat-category-card__body">
                        <h5 className="meat-category-card__title">{name}</h5>
                        <p className="meat-category-card__para">
                          {description}
                        </p>
                        <Link
                          href={`/products/category=${name
                            ?.replace(/\s+/g, "")
                            .toLowerCase()}=${_id}`}
                          className="meat-category-card__btn animated-btn-icon"
                        >
                          <span className="meat-category-card__btn-text">
                            Shop Now
                          </span>
                          <span className="meat-category-card__btn-icon">
                            <i className="fas fa-arrow-right-long"></i>
                          </span>
                        </Link>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="meat-category-slider__pagination text-center mt-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

