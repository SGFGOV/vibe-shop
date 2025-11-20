"use client";

import Link from "next/link";
import { Category, Product } from "@/types";

interface FurnitureCategoryProps {
  setting?: {
    home3?: {
      furniture_category_title?: string;
    };
  };
  categorys?: Category[];
  products?: Product[];
}

const FurnitureCategory = ({
  setting,
  categorys,
  products,
}: FurnitureCategoryProps) => {
  return (
    <div className="section-space-top section-space-sm-bottom">
      <div className="section-space-xsm-bottom">
        <div className="container">
          <div className="row justify-center">
            <div className="col-md-8 col-xl-6">
              <h2 className="text-center display-6 mb-0">
                {setting?.home3?.furniture_category_title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          <div className="col-12">
            <ul className="list list--row flex-wrap gap-4 category-list">
              {categorys?.map((cat, index) => (
                <li key={index}>
                  <Link
                    href={`/products/category=${cat.name
                      ?.replace(/\s+/g, "")
                      .toLowerCase()}=${cat._id}`}
                    className="link d-block text-center category-list__content px-4 py-8 rounded-2"
                  >
                    <span className="category-list__icon mb-6 d-block text-center">
                      <img
                        src={cat.icon}
                        alt="image"
                        className="img-fluid category-list__icon-is transition mx-auto d-block"
                      />
                    </span>

                    <span className="category-list__title d-block fw-bold clr-heading text-center fs-20 mb-1 transition">
                      {cat.name}
                    </span>
                    <span className="category-list__subtitle d-flex justify-content-center align-items-center gap-1">
                      <span className="category-list__dot transition d-inline-block flex-shrink-0 w-2 h-2 rounded-circle secondary-bg"></span>
                      <span className="category-list__subtitle-text clr-heading fs-14 transition">
                        {
                          products?.filter(
                            (p) =>
                              p.category?.replace(/\s+/g, "").toLowerCase() ===
                              `${cat.name?.replace(/\s+/g, "").toLowerCase()}`
                          ).length
                        }{" "}
                        items
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FurnitureCategory;

