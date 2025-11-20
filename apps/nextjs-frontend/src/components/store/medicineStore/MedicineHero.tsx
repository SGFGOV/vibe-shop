"use client";

import Link from "next/link";

interface MedicineHeroProps {
  setting?: {
    medicine_hero_sub_title?: string;
    medicine_hero_title?: string;
    medicine_hero_text?: string;
    medicine_hero_img_one?: string;
    medicine_hero_img_two?: string;
    medicine_hero_img_three?: string;
  };
}

const MedicineHero = ({ setting }: MedicineHeroProps) => {
  return (
    <>
      <div className="hero-6">
        <div className="hero-6__content">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="hero-6__inner">
                  <div className="row">
                    <div className="col-md-8 col-lg-6 col-xxl-5">
                      <span className="hero-6__subtitle d-inline-block mb-2">
                        {setting?.medicine_hero_sub_title}
                      </span>
                      <h1 className="hero-6__title mb-4">
                        {setting?.medicine_hero_title}
                      </h1>
                      <p className="hero-6__para fs-18 mb-10">
                        {setting?.medicine_hero_text}
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
                  <div className="hero-6__el-container">
                    <img
                      src={setting?.medicine_hero_img_one}
                      alt="element"
                      className="img-fluid hero-6__el hero-6__el-1"
                    />
                    <img
                      src={setting?.medicine_hero_img_two}
                      alt="element"
                      className="img-fluid hero-6__el hero-6__el-2"
                    />
                    <img
                      src={setting?.medicine_hero_img_three}
                      alt="element"
                      className="img-fluid hero-6__el hero-6__el-3"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MedicineHero;

