"use client";

import React from "react";
import StarRating from "../common/others/StartRating";
import Link from "next/link";
import { Product } from "@/types";

interface HalalProductCardProps {
  product: Product;
}

const HalalProductCard = ({ product }: HalalProductCardProps) => {
  return (
    <div className="col-md-6 col-lg-4 col-xxl-3">
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
          {Boolean(product.isOnSale) && (
            <span className="meat-card__badge">On Sale</span>
          )}
        </div>
        <div className="meat-card__body">
          <span className="meat-card__subtitle">{product.category}</span>
          <h6 className="meat-card__title">
            <Link
              href={`/product-details/${product._id}`}
              className="link meat-card__title-link"
            >
              {product.name}
            </Link>
          </h6>
          <ul className="list list--row">
            <StarRating rating={product?.averageRating} />
          </ul>
          <div className="d-flex flex-wrap align-items-center justify-content-between gap-3 mt-4">
            <div className="d-flex align-items-center gap-3">
              {product.prices?.originalPrice && (
                <h6 className="meat-card__pre-price text-decoration-line-through mb-0">
                  ${product.prices.originalPrice}
                </h6>
              )}
              <h6 className="meat-card__current-price mb-0">
                ${product.prices?.price || 0}
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HalalProductCard;
