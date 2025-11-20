"use client";

import React, { useState } from "react";
import HalalProductCard from "./HalalProductCard";
import { Product } from "@/types";

interface HalalMostPopularProductProps {
  setting?: {
    home2?: {
      halal_food_most_popular_product_categorys?: string[];
      halal_food_most_popular_product_title?: string;
      halal_food_most_popular_product_text?: string;
    };
  };
  products?: Product[];
}

const HalalMostPopularProduct = ({
  setting,
  products,
}: HalalMostPopularProductProps) => {
  const [activeTab, setActiveTab] = useState(
    setting?.home2?.halal_food_most_popular_product_categorys?.[0] || ""
  );
  const title =
    setting?.home2?.halal_food_most_popular_product_title || "";
  const words = title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");

  const filteredProducts = products?.filter(
    (product) => product?.category === activeTab
  );

  return (
    <>
      <section className="section-space-top section-space-sm-bottom">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-10 col-xl-8 col-xxl-6">
                <h2 className="text-center h2 display-6 mb-4">
                  {firstPart} <span className="meat-primary">{lastWord}</span>
                </h2>
                <p className="mb-0 text-center">
                  {setting?.home2?.halal_food_most_popular_product_text}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="list-group d-flex flex-wrap flex-row gap-4 justify-content-center mb-12">
                {setting?.home2?.halal_food_most_popular_product_categorys?.map(
                  (cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveTab(cat)}
                      className={`meat-category-tab ${
                        activeTab === cat ? "active" : ""
                      }`}
                    >
                      {cat}
                    </button>
                  )
                )}
              </div>

              <div className="tab-content">
                <div className="tab-pane fade show active">
                  <div className="row g-4">
                    {filteredProducts && filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <HalalProductCard
                          key={product._id}
                          product={product}
                        />
                      ))
                    ) : (
                      <p className="text-center">No products found.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HalalMostPopularProduct;

