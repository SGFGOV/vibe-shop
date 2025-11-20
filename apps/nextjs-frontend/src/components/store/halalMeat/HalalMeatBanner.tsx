"use client";

import Link from "next/link";

interface HalalMeatBannerProps {
  setting?: {
    halal_meat_banner_two_img?: string;
    halal_meat_banner_one_img?: string;
  };
}

const HalalMeatBanner = ({ setting }: HalalMeatBannerProps) => {
  return (
    <>
      <div className="hl-banner-section pt-9">
        <div className="container">
          <div className="row g-4">
            <div className="col-xl-7">
              <div className="banner-1">
                <Link href="/products">
                  <img
                    src={setting?.halal_meat_banner_two_img}
                    alt="banner"
                    className="rounded img-fluid"
                  />
                </Link>
              </div>
            </div>
            <div className="col-xl-5">
              <div className="banner-2">
                <Link href="/products">
                  <img
                    src={setting?.halal_meat_banner_one_img}
                    alt="banner"
                    className="rounded img-fluid"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HalalMeatBanner;

