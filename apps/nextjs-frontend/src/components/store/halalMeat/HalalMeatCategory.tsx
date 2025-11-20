"use client";

import Link from "next/link";
import { Category } from "@/types";

interface HalalMeatCategoryProps {
  setting?: {
    halal_meat_category_sub_title?: string;
    halal_meat_category_title?: string;
    halal_meat_category_text?: string;
  };
  categorys?: Category[];
}

const HalalMeatCategory = ({ setting, categorys }: HalalMeatCategoryProps) => {
  return (
    <>
      <section className="hl-category-section pb-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6">
              <div className="text-center">
                <span className="hl-subtitle fw-bold mb-2">
                  {setting?.halal_meat_category_sub_title}
                </span>
                <h2 className="hl-heading mb-3 h1">
                  {setting?.halal_meat_category_title}
                </h2>
                <p className="mb-7">{setting?.halal_meat_category_text}</p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center">
            {categorys?.map((item, index) => (
              <div key={index} className="col-xl-3 col-lg-4 col-md-6">
                <div className="hl-category-card d-flex align-items-center gap-3">
                  <span className="icon-wrapper">
                    <img src={item?.icon} alt="icon" className="img-fluid" />
                  </span>
                  <div>
                    <h6>{item?.name}</h6>
                    <Link
                      href={`/products/category=${item?.name
                        ?.replace(/\s+/g, "")
                        .toLowerCase()}=${item?._id}`}
                      className="explore-btn"
                    >
                      Shop Now
                      <span className="ms-2">
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8.78866 0.7C8.78866 0.523189 8.71842 0.35362 8.59339 0.228595C8.46837 0.103571 8.2988 0.0333335 8.12199 0.0333335L2.78866 0C2.61184 0 2.44228 0.070238 2.31725 0.195262C2.19223 0.320287 2.12199 0.489856 2.12199 0.666667C2.12199 0.843478 2.19223 1.01305 2.31725 1.13807C2.44228 1.2631 2.61184 1.33333 2.78866 1.33333H6.49532L0.981989 6.86C0.919503 6.92198 0.869907 6.99571 0.836061 7.07695C0.802216 7.15819 0.78479 7.24532 0.78479 7.33333C0.78479 7.42134 0.802216 7.50848 0.836061 7.58972C0.869907 7.67096 0.919503 7.74469 0.981989 7.80667C1.04396 7.86915 1.1177 7.91875 1.19894 7.95259C1.28018 7.98644 1.36731 8.00387 1.45532 8.00387C1.54333 8.00387 1.63047 7.98644 1.71171 7.95259C1.79295 7.91875 1.86668 7.86915 1.92866 7.80667L7.45532 2.28V6C7.45532 6.17681 7.52556 6.34638 7.65058 6.4714C7.77561 6.59643 7.94518 6.66667 8.12199 6.66667C8.2988 6.66667 8.46837 6.59643 8.59339 6.4714C8.71842 6.34638 8.78866 6.17681 8.78866 6V0.7Z"
                            fill="#637381"
                          />
                        </svg>
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HalalMeatCategory;

