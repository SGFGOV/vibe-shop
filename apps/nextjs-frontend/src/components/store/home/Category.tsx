"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { Category as CategoryType, Product } from "@/types";
import { getCategoryThumbnail, hasCategoryImages } from "@/utils/categoryImages";

interface CategoryProps {
  categorys?: CategoryType[];
  products?: Product[];
}

const Category = ({ categorys, products }: CategoryProps) => {
  const groceryCategory = categorys?.filter((cat) =>
    cat.theme?.includes("Grocery")
  );
  
  return (
    <>
      <section className="gshop-category-section bg-white pt-120 position-relative z-1 overflow-hidden">
        <img
          src="/img/shapes/bg-shape.png"
          alt="bg shape"
          className="position-absolute bottom-0 start-0 w-100 z--1"
        />
        <div className="container">
          <div className="gshop-category-box border-secondary rounded-3 bg-white">
            <div className="text-center section-title">
              <h4 className="d-inline-block px-2 bg-white mb-4">
                Our Top Category
              </h4>
            </div>
            <div className="row justify-content-center g-4">
              {groceryCategory?.slice(0, 6).map((category, index) => (
                <div
                  className="col-xxl-2 col-lg-3 col-md-4 col-sm-6"
                  key={index}
                >
                  <div
                    className={`gshop-animated-iconbox py-5 px-4 text-center border rounded-3 position-relative overflow-hidden ${
                      category.colorClass || ""
                    }`}
                  >
                    <div className="animated-icon d-inline-flex align-items-center justify-content-center rounded-circle position-relative">
                      {hasCategoryImages(category) ? (
                        <Image
                          src={getCategoryThumbnail(category)}
                          alt={category.name}
                          width={64}
                          height={64}
                          className="img-fluid rounded-circle object-cover"
                          style={{ width: "64px", height: "64px" }}
                        />
                      ) : (
                        <img
                          src={category.icon || "/img/default-category.png"}
                          alt={category.name}
                          className="img-fluid"
                        />
                      )}
                    </div>
                    <Link
                      href={`/products/category=${category.name
                        .replace(/\s+/g, "")
                        .toLowerCase()}=${category._id}`}
                      className="text-dark fs-sm fw-bold d-block mt-3"
                    >
                      {category.name}
                    </Link>
                    <span className="total-count position-relative ps-3 fs-sm fw-medium doted-primary">
                      {
                        products?.filter(
                          (p) =>
                            p.category?.replace(/\s+/g, "").toLowerCase() ===
                            `${category.name.replace(/\s+/g, "").toLowerCase()}`
                        ).length
                      }{" "}
                    </span>
                    <Link
                      href={`/products/category=${category.name
                        .replace(/\s+/g, "")
                        .toLowerCase()}=${category._id}`}
                      className="explore-btn position-absolute"
                    >
                      <i className="fa-solid fa-arrow-up"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Category;

