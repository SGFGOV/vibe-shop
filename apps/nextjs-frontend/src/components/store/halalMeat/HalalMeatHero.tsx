"use client";

import Link from "next/link";

interface HalalMeatHeroProps {
  setting?: {
    hala_meat_hero_sub_title?: string;
    hala_meat_hero_title?: string;
    hala_meat_hero_link?: string;
    hala_meat_hero_link_text?: string;
    hala_meat_hero_img?: string;
  };
}

const HalalMeatHero = ({ setting }: HalalMeatHeroProps) => {
  return (
    <section className="hl-hero-section position-relative z-1 overflow-hidden">
      <img
        src="/img/shapes/halal-badge.png"
        alt="badge"
        className="position-absolute z--1 halal-badge d-none d-xl-block"
      />
      <img
        src="/img/shapes/halal-arabic.png"
        alt="arabic"
        className="position-absolute z--1 halal-arabic"
      />
      <img
        src="/img/shapes/leaf-blur.png"
        alt="arabic"
        className="position-absolute z--1 leaf-shape"
      />
      <div className="container">
        <div className="row g-4 align-items-center">
          <div className="col-xxl-6 col-xl-7">
            <div className="hl-hero-content">
              <span className="hl-hero-subtitle mb-3">
                {setting?.hala_meat_hero_sub_title}
              </span>
              <h1 className="display-3 text-white mb-7">
                {setting?.hala_meat_hero_title}{" "}
                <span
                  className="typer"
                  id="main"
                  data-words="America, England, India"
                  data-delay="100"
                  data-deletedelay="1500"
                  data-colors="#4eb529"
                ></span>
                <span className="cursor" data-owner="main"></span>
              </h1>

              <Link
                href={setting?.hala_meat_hero_link || "#"}
                className="btn hl-primary-btn"
              >
                {setting?.hala_meat_hero_link_text}
                <span className="ms-2">
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11 0.875C11 0.653986 10.9122 0.442025 10.7559 0.285744C10.5996 0.129464 10.3877 0.0416668 10.1667 0.0416668L3.49999 0C3.27898 0 3.06702 0.0877975 2.91074 0.244078C2.75446 0.400358 2.66666 0.61232 2.66666 0.833333C2.66666 1.05435 2.75446 1.26631 2.91074 1.42259C3.06702 1.57887 3.27898 1.66667 3.49999 1.66667H8.13333L1.24166 8.575C1.16355 8.65247 1.10156 8.74464 1.05925 8.84619C1.01695 8.94774 0.995163 9.05666 0.995163 9.16667C0.995163 9.27668 1.01695 9.3856 1.05925 9.48715C1.10156 9.5887 1.16355 9.68086 1.24166 9.75833C1.31913 9.83644 1.4113 9.89844 1.51285 9.94074C1.6144 9.98305 1.72332 10.0048 1.83333 10.0048C1.94334 10.0048 2.05226 9.98305 2.15381 9.94074C2.25536 9.89844 2.34753 9.83644 2.42499 9.75833L9.33333 2.85V7.5C9.33333 7.72101 9.42112 7.93298 9.5774 8.08926C9.73368 8.24554 9.94565 8.33333 10.1667 8.33333C10.3877 8.33333 10.5996 8.24554 10.7559 8.08926C10.9122 7.93298 11 7.72101 11 7.5V0.875Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
          <div className="col-xxl-6 col-xl-5">
            <div className="hl-hero-image">
              <img
                src={setting?.hala_meat_hero_img}
                className="img-fluid"
                alt="not found"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="gs-hero-social">
        <ul className="list-unstyled">
          <li>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default HalalMeatHero;

