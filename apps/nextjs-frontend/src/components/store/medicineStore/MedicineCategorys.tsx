"use client";

import Link from "next/link";
import React, { useState, useRef } from "react";
import { Category } from "@/types";

interface MedicineCategorysProps {
  categorys?: Category[];
  setting?: Record<string, unknown>;
}

const MedicineCategorys = ({ categorys, setting }: MedicineCategorysProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (index: number) => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
    hoverTimeout.current = setTimeout(() => {
      setActiveIndex(index);
    }, 10);
  };

  const handleMouseLeave = () => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
    }
  };

  return (
    <div className="section-space-sm-y">
      <div className="section-space-xsm-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10 col-xl-8">
              <h2 className="text-center mb-0 display-6">
                Most Popular Category
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="popular-category">
              {categorys?.slice(0, 3).map((item, index) => (
                <div
                  key={item._id}
                  className={`popular-category__item ${
                    index === activeIndex ? "active" : ""
                  }`}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="popular-category__container">
                    <div className="popular-category__img">
                      <img
                        src={item.icon}
                        alt={item.name}
                        className="img-fluid"
                      />
                    </div>
                    <div className="popular-category__content">
                      <h5 className="popular-category__content-title">
                        {item.name}
                      </h5>
                    </div>
                    <div className="popular-category__overlay">
                      <h5 className="popular-category__overlay-title">
                        {item.name}
                      </h5>
                      <p className="popular-category__overlay-para">
                        {item.description}
                      </p>
                      <Link
                        href={`/products/category=${item.name
                          ?.replace(/\s+/g, "")
                          .toLowerCase()}=${item._id}`}
                        className="popular-category__overlay-btn"
                      >
                        <img
                          src="/img/home-6/icon-arrow.png"
                          alt="arrow icon"
                          className="img-fluid"
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCategorys;

