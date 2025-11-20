"use client";

import { useMemo, useEffect, useState } from "react";
import Link from "next/link";
import WeeklyBestDealsCard from "../common/card/WeeklyBestDealsCard";
import WeeklyBestDealsOfferTime from "./WeeklyBestDealsOfferTime";
import { getProductByIds } from "../../../app/backend/controllers/product.controller";
import { Product } from "@/types";

interface WeeklyBestDealsProps {
  setting?: {
    home?: {
      weekly_best_deals_sub_title?: string;
      weekly_best_deals_banner_title?: string;
      weekly_best_deals_offer_title?: string;
      weekly_best_deals_title?: string;
      weekly_best_deals_end_time?: string;
      weekly_best_delas_product_one?: { id?: string };
      weekly_best_delas_product_two?: { id?: string };
      weekly_best_delas_product_three?: { id?: string };
      weekly_best_delas_product_four?: { id?: string };
    };
  };
  products?: Product[];
}

const WeeklyBestDeals = ({ setting, products }: WeeklyBestDealsProps) => {
  const bestWeeklyDeals = products?.filter((p) => (p?.prices?.discount || 0) >= 10);
  
  const weeklyBestDealsProductIds = useMemo(
    () => [
      `${setting?.home?.weekly_best_delas_product_one?.id}`,
      `${setting?.home?.weekly_best_delas_product_two?.id}`,
      `${setting?.home?.weekly_best_delas_product_three?.id}`,
      `${setting?.home?.weekly_best_delas_product_four?.id}`,
    ],
    [setting]
  );
  
  const [weeklyBestProducts, setWeeklyBestProducts] = useState<Product[]>([]);

  useEffect(() => {
    const validIds = weeklyBestDealsProductIds.filter(
      (id) => id && id !== "undefined"
    );

    if (validIds.length === 0) {
      return;
    }

    const fetchData = async () => {
      try {
        const res = await getProductByIds(validIds);
        setWeeklyBestProducts(res && res.products && Array.isArray(res.products) ? res.products : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [weeklyBestDealsProductIds]);

  return (
    <>
      <section className="pb-120 position-relative z-1 pt-120">
        <div className="container">
          <div className="row g-4 align-items-center justify-content-center">
            <div className="col-xxl-4 col-xl-5 order-2 order-xxl-1">
              <div className="banner-box banner-color-green position-relative overflow-hidden z-1 rounded-2 pe-0 pb-0">
                <span className="gshop-subtitle text-secondary mb-1">
                  {setting?.home?.weekly_best_deals_sub_title}
                </span>

                <h4 className="mb-2">
                  {setting?.home?.weekly_best_deals_banner_title}
                </h4>
                <p className="fw-medium mb-5">
                  {setting?.home?.weekly_best_deals_offer_title}
                </p>
                <Link href="/products" className="btn btn-primary btn-md">
                  Show Now
                  <span className="ms-2">
                    <i className="fas fa-arrow-right"></i>
                  </span>
                </Link>
                <div className="banner-img-wrapper d-flex justify-content-end mt--40">
                  <img
                    src="/img/banner/vegetables.png"
                    alt="vegetables"
                    className=""
                  />
                </div>
              </div>
            </div>
            <div className="col-xxl-8 order-1 order-xxl-2">
              <div className="timing-box d-flex align-items-center justify-content-center justify-content-sm-between rounded-3 flex-wrap gap-3">
                <h4 className="mb-0">
                  {setting?.home?.weekly_best_deals_title}
                </h4>
                <ul className="timing-countdown countdown-timer d-flex align-items-center gap-2">
                  {setting?.home?.weekly_best_deals_end_time && (
                    <WeeklyBestDealsOfferTime
                      expiryTimestamp={
                        new Date(setting.home.weekly_best_deals_end_time)
                      }
                    />
                  )}
                </ul>
              </div>
              <div className="mt-4">
                <div className="row g-4">
                  {weeklyBestProducts?.slice(0, 4).map((product) => (
                    <WeeklyBestDealsCard product={product} key={product._id} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeeklyBestDeals;

