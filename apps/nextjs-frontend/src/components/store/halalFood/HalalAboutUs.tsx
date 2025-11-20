"use client";

import Image from "next/image";
import Link from "next/link";

interface HalalAboutUsProps {
  setting?: {
    home2?: {
      halal_food_about_us_large_img?: string;
      halal_food_about_us_user_couter?: string;
      halal_food_about_us_user_couter_text?: string;
      halal_food_about_us_sub_title?: string;
      halal_food_about_us_title?: string;
      halal_food_about_us_text?: string;
      halal_food_about_us_link_text?: string;
      halal_food_about_us_user_name?: string;
      halal_food_about_us_user_designation?: string;
      halal_food_feature_icon_one?: string;
      halal_food_feature_one_title?: string;
      halal_food_feature_one_text?: string;
      halal_food_feature_icon_two?: string;
      halal_food_feature_two_title?: string;
      halal_food_feature_two_text?: string;
      halal_food_feature_icon_three?: string;
      halal_food_feature_three_title?: string;
      halal_food_feature_three_text?: string;
      halal_food_feature_icon_four?: string;
      halal_food_feature_four_title?: string;
      halal_food_feature_four_text?: string;
    };
  };
}

export default function HalalAboutUs({ setting }: HalalAboutUsProps) {
  const features = [
    {
      img: setting?.home2?.halal_food_feature_icon_one || "",
      title: setting?.home2?.halal_food_feature_one_title || "",
      desc: setting?.home2?.halal_food_feature_one_text || "",
    },
    {
      img: setting?.home2?.halal_food_feature_icon_two || "",
      title: setting?.home2?.halal_food_feature_two_title || "",
      desc: setting?.home2?.halal_food_feature_two_text || "",
    },
    {
      img: setting?.home2?.halal_food_feature_icon_three || "",
      title: setting?.home2?.halal_food_feature_three_title || "",
      desc: setting?.home2?.halal_food_feature_three_text || "",
    },
    {
      img: setting?.home2?.halal_food_feature_icon_four || "",
      title: setting?.home2?.halal_food_feature_four_title || "",
      desc: setting?.home2?.halal_food_feature_four_text || "",
    },
  ];

  return (
    <section className="meat-about-us">
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-5">
            <div className="meat-about-info-left position-relative">
              <Image
                src={setting?.home2?.halal_food_about_us_large_img || ""}
                alt="about-us"
                className="img-fluid rounded-3"
                width={500}
                height={500}
              />
              <div className="expert-box bg-meat-primary text-light rounded-circle shadow-lg position-absolute">
                <div className="expert-info text-center">
                  <div className="fw-bolder mb-2 display-5 lh-0">
                    {setting?.home2?.halal_food_about_us_user_couter}
                  </div>
                  <br />
                  <span>
                    {setting?.home2?.halal_food_about_us_user_couter_text}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="meat-about-info-right">
              <strong className="meat-primary mb-2 d-block">
                {setting?.home2?.halal_food_about_us_sub_title}
              </strong>
              <h2 className="fw-bolder display-6 mb-4">
                {setting?.home2?.halal_food_about_us_title}
              </h2>
              <p className="mb-12">
                {setting?.home2?.halal_food_about_us_text}
              </p>

              <div className="d-flex align-items-center flex-wrap gap-15 mt-6">
                <Link href="/shop-grid" className="btn btn-dark animated-btn-icon">
                  {setting?.home2?.halal_food_about_us_link_text}
                  <span className="ms-2">
                    <i className="fa-solid fa-arrow-right"></i>
                  </span>
                </Link>
                <div className="d-flex align-items-center gap-4">
                  <div className="w-18 h-18 rounded-circle overflow-hidden flex-shrink-0">
                    <Image
                      src="/img/user-1.png"
                      alt="Peter Parker"
                      className="img-fluid w-100 h-100 object-fit-cover"
                      width={72}
                      height={72}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="mb-0 fs-18">
                      {setting?.home2?.halal_food_about_us_user_name}
                    </h6>
                    <p className="mb-0">
                      {setting?.home2?.halal_food_about_us_user_designation}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <div className="row bg-dark rounded-3 py-5 px-4">
            {features.map((feature, idx) => (
              <div className="col-lg-3 col-md-6" key={idx}>
                <div className="single-hilighted-feature d-flex align-items-center">
                  <div className="hilighted-icon me-3">
                    <Image
                      src={feature.img}
                      alt={feature.title}
                      className="shadow-lg"
                      width={50}
                      height={50}
                    />
                  </div>
                  <div className="hilighted-info">
                    <h6 className="text-light mb-1">{feature.title}</h6>
                    <span>{feature.desc}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

