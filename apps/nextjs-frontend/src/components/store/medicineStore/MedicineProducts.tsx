"use client";

import React, { useState } from "react";
import useAddToCart from "../hooks/useAddToCart";
import Link from "next/link";
import { Product } from "@/types";

interface CategoryOption {
  label: string;
  value: string;
}

interface MedicineProductsProps {
  setting?: {
    medicine_helth_products_categorys?: CategoryOption[];
  };
  products?: Product[];
}

const MedicineProducts = ({
  setting,
  products,
}: MedicineProductsProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>(
    setting?.medicine_helth_products_categorys?.[0]?.value || ""
  );
  const { handelAddItem } = useAddToCart();
  
  return (
    <div className="section-space-sm-y">
      <div className="medicine-product-section section-space-y">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row g-4">
              <div className="col-xl-5 col-xxl-6">
                <h2 className="mb-0 display-6">Medicine & Health Products</h2>
              </div>
              <div className="col-xl-7 col-xxl-6">
                <div className="row g-4 align-items-center">
                  <div className="col-md-9">
                    <p className="mb-0">
                      Distinctively unleash business technologies without
                      backend metrics. Conveniently network distributed core
                      competencies. Continually integrate backward-compatible.
                    </p>
                  </div>
                  <div className="col-md-3">
                    <div className="text-lg-end">
                      <div className="dropdown">
                        <button
                          className={`button button-outline button-md button--primary dropdown-toggle fw-semibold ${
                            isOpen ? "show" : ""
                          }`}
                          type="button"
                          onClick={() => setIsOpen(!isOpen)}
                        >
                          {activeCategory || "Health Care"}
                        </button>
                        <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                          {setting?.medicine_helth_products_categorys?.map(
                            (c) => (
                              <li key={c.value}>
                                <a
                                  className={`dropdown-item ${
                                    activeCategory === c.value ? "active" : ""
                                  }`}
                                  type="button"
                                  onClick={() => {
                                    setActiveCategory(c.value);
                                    setIsOpen(false);
                                  }}
                                >
                                  {c.label}
                                </a>
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row g-4">
            {products
              ?.filter(
                (p) =>
                  p.category?.replace(/\s+/g, "").toLowerCase() ===
                  activeCategory?.replace(/\s+/g, "").toLowerCase()
              )
              .map((product) => (
                <div key={product._id} className="col-md-6 col-lg-4 col-xxl-3">
                  <div className="meat-card">
                    <div className="meat-card__img text-center">
                      <Link
                        href={`/product-details/${product._id}`}
                        className="link d-inline-block text-center"
                      >
                        <img
                          src={
                            Array.isArray(product.image)
                              ? product.image[0]
                              : product.image || ""
                          }
                          alt={product.name || ""}
                          className="img-fluid w-100 h-100 object-fit-contain"
                        />
                      </Link>
                    </div>
                    <div className="meat-card__body">
                      <span className="meat-card__subtitle">
                        {product.category}
                      </span>
                      <h6 className="meat-card__title">
                        <Link
                          href={`/product-details/${product._id}`}
                          className="link meat-card__title-link"
                        >
                          {product.name}
                        </Link>
                      </h6>
                      <ul className="list list--row">
                        {[...Array(5)].map((_, index) => (
                          <li key={index}>
                            <span className="meat-card__star d-inline-block">
                              <i className="fas fa-star"></i>
                            </span>
                          </li>
                        ))}
                        <li className="ms-2">
                          <span className="d-inline-block fs-12 fw-semibold clr-heading">
                            {String(product.rating || 0)} ({String(product.averageRating || 0)})
                          </span>
                        </li>
                      </ul>
                      <div className="mt-4">
                        <a
                          type="button"
                          onClick={() =>
                            handelAddItem({
                              ...product,
                              id: product._id || product.id,
                            })
                          }
                          className="link d-inline-block py-2 px-3 text-center rounded-1 primary-bg bg-opacity-1 :bg-opacity-100 clr-primary :clr-light fw-semibold"
                        >
                          Add to Cart
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineProducts;

