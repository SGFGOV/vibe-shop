"use client";

import Image from "next/image";

interface HalalCounterProps {
  setting?: {
    home2?: {
      hala_food_hero_counter_one?: string;
      hala_food_hero_counter_one_text?: string;
      hala_food_hero_counter_two?: string;
      hala_food_hero_counter_two_text?: string;
    };
  };
}

const HalalCounter = ({ setting }: HalalCounterProps) => {
  return (
    <div className="counter-promo">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-7">
            <div
              className="promo-info-wrap d-flex align-items-center justify-content-around p-4 bg-overlay-img rounded"
              style={{
                background: `url('/img/home-5/promo-bg.png') no-repeat center top`,
              }}
            >
              <div className="singl-promo-info text-center text-light">
                <span className="fw-bolder display-4">
                  {setting?.home2?.hala_food_hero_counter_one}
                </span>
                <strong className="d-block">
                  {setting?.home2?.hala_food_hero_counter_one_text}
                </strong>
              </div>
              <div className="singl-promo-info text-center text-light">
                <span className="fw-bolder display-4">
                  {setting?.home2?.hala_food_hero_counter_two}
                </span>
                <strong className="d-block">
                  {setting?.home2?.hala_food_hero_counter_two_text}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalalCounter;
