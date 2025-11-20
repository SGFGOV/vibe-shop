"use client";

import { Product } from "@/types";

interface PriceProps {
  product: Product;
  price?: number;
  originalPrice?: number;
}

const Price = ({ product, price, originalPrice }: PriceProps) => {
  const displayPrice = (product?.variants as unknown[])?.length > 0 
    ? price 
    : product?.prices?.price;
  
  const displayOriginalPrice = (product?.variants as unknown[])?.length > 0
    ? originalPrice
    : product?.prices?.originalPrice;

  return (
    <div className="font-weight-bold">
      <span className="d-inline-block text-2xl text-danger font-semibold">
        ${displayPrice?.toFixed(2) || "0.00"}
      </span>

      {displayPrice && displayOriginalPrice && displayPrice < displayOriginalPrice && (
        <del className="text-2xl font-semibold text-muted ml-3">
          ${parseFloat(String(displayOriginalPrice)).toFixed(2)}
        </del>
      )}
    </div>
  );
};

export default Price;
