"use client";

import { useEffect, useState } from "react";

interface HalalChooseUsProps {
  setting?: {
    home2?: {
      halal_food_why_choose_us_large_img?: string;
      halal_food_why_choose_us_title?: string;
      halal_food_why_choose_us_text?: string;
      halal_food_why_choose_us_feature_one_icon?: string;
      halal_food_why_choose_us_feature_one_title?: string;
      halal_food_why_choose_us_feature_one_text?: string;
      halal_food_why_choose_us_feature_two_icon?: string;
      halal_food_why_choose_us_feature_two_title?: string;
      halal_food_why_choose_us_feature_two_text?: string;
      halal_food_why_choose_us_feature_three_icon?: string;
      halal_food_why_choose_us_feature_three_title?: string;
      halal_food_why_choose_us_feature_three_text?: string;
    };
  };
}

const HalalChooseUs = ({ setting }: HalalChooseUsProps) => {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1200);
    };
    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <div>
      <div className="section-space-sm-y">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                className="section-space-sm-y"
                style={{ position: "relative", isolation: "isolate" }}
              >
                <div
                  className="choose-bg-image"
                  style={{
                    position: "absolute",
                    insetBlock: 0,
                    insetInlineEnd: 0,
                    insetInlineStart: "55%",
                    zIndex: -1,
                    backgroundImage: `url(${setting?.home2?.halal_food_why_choose_us_large_img})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    display: isDesktop ? "block" : "none",
                  }}
                />

                <div className="section-space-sm-bottom">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-8 col-xl-6 col-xxl-5">
                        <h2 className="mb-4 display-6">
                          {setting?.home2?.halal_food_why_choose_us_title}
                        </h2>
                        <p className="mb-0">
                          {setting?.home2?.halal_food_why_choose_us_text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="container">
                  <div className="row g-4">
                    <div className="col-md-6 col-lg-4 col-xl-3">
                      <div className="choose-card">
                        <div className="mb-6">
                          <img
                            src={
                              setting?.home2
                                ?.halal_food_why_choose_us_feature_one_icon
                            }
                            alt="image"
                            className="img-fluid"
                          />
                        </div>
                        <h5 className="mb-2 fs-20">
                          {
                            setting?.home2
                              ?.halal_food_why_choose_us_feature_one_title
                          }
                        </h5>
                        <p className="mb-0 fs-14">
                          {
                            setting?.home2
                              ?.halal_food_why_choose_us_feature_one_text
                          }
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-3">
                      <div className="choose-card">
                        <div className="mb-6">
                          <img
                            src={
                              setting?.home2
                                ?.halal_food_why_choose_us_feature_two_icon
                            }
                            alt="image"
                            className="img-fluid"
                          />
                        </div>
                        <h5 className="mb-2 fs-20">
                          {
                            setting?.home2
                              ?.halal_food_why_choose_us_feature_two_title
                          }
                        </h5>
                        <p className="mb-0 fs-14">
                          {
                            setting?.home2
                              ?.halal_food_why_choose_us_feature_two_text
                          }
                        </p>
                      </div>
                    </div>
                    <div className="col-md-6 col-lg-4 col-xl-3">
                      <div className="choose-card">
                        <div className="mb-6">
                          <img
                            src={
                              setting?.home2
                                ?.halal_food_why_choose_us_feature_three_icon
                            }
                            alt="image"
                            className="img-fluid"
                          />
                        </div>
                        <h5 className="mb-2 fs-20">
                          {
                            setting?.home2
                              ?.halal_food_why_choose_us_feature_three_title
                          }
                        </h5>
                        <p className="mb-0 fs-14">
                          {
                            setting?.home2
                              ?.halal_food_why_choose_us_feature_three_text
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalalChooseUs;

