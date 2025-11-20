"use client";

import Image from "next/image";
import Link from "next/link";

interface HalalFoodHeroProps {
  setting?: {
    home2?: {
      hala_food_hero_sub_title?: string;
      hala_food_hero_text?: string;
      hala_food_hero_link_text?: string;
    };
  };
}

const HalalFoodHero = ({ setting }: HalalFoodHeroProps) => {
  return (
    <>
      <section
        className="gshop-hero meat-hero ptb-120 bg-meat-primary position-relative z-1 overflow-hidden"
        style={{
          background: `url('/img/home-5/bg-shape.png') no-repeat center top`,
        }}
      >
        <Image
          src="/img/shapes/leaf-shadow.png"
          alt="leaf"
          width={100}
          height={100}
          className="position-absolute leaf-shape z--1 rounded-circle"
        />
        <Image
          src="/img/shapes/mango.png"
          alt="mango"
          width={100}
          height={100}
          className="position-absolute mango z--1"
          data-parallax='{"y": -120}'
        />
        <Image
          src="/img/shapes/hero-circle-sm.png"
          alt="circle"
          width={100}
          height={100}
          className="position-absolute hero-circle circle-sm z--1"
        />
        <div className="container">
          <div className="row align-items-center justify-content-between">
            <div className="col-xl-5 col-lg-8">
              <div className="hero-left-content">
                <h1 className="display-3 fw-bolder mb-3">
                  <span className="fs-1">
                    {setting?.home2?.hala_food_hero_sub_title}
                  </span>{" "}
                  <br />
                  {setting?.home2?.hala_food_hero_sub_title}
                </h1>
                <p className="mb-7 fs-6">
                  {setting?.home2?.hala_food_hero_text}
                </p>
                <div className="hero-btns d-flex align-items-center gap-3 gap-sm-5 flex-wrap animated-btn-icon">
                  <Link
                    href="/halal-food/products"
                    className="btn btn-dark"
                  >
                    {setting?.home2?.hala_food_hero_link_text}
                    <span className="ms-2">
                      <i className="fas fa-arrow-right-long"></i>
                    </span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-xl-6 col-lg-7">
              <div className="hero-right text-center position-relative z-1 mt-8 mt-xl-0">
                <Image
                  src="/img/home-5/hero-img.png"
                  alt="fruits"
                  width={600}
                  height={500}
                  className="img-fluid hero-img"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HalalFoodHero;
