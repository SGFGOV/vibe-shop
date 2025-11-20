"use client";

import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";
import { Category, Brand } from "@/types";

interface MedicineSearchFilterProps {
  products?: unknown[];
  categorys?: Category[];
  brands?: Brand[];
}

const MedicineSearchFilter = ({
  products,
  categorys,
  brands,
}: MedicineSearchFilterProps) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState<string>("");
  
  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();
    if (searchText.trim()) {
      router.push(`/products/search=${searchText}`);
    }
  };
  
  return (
    <div>
      <div className="search-filter-container">
        <div className="container">
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="customer-counter rounded">
                <h1 className="customer-counter__title">900K+</h1>
                <span className="coustomer-counter__subtitle">
                  Join Our Happy Customer
                </span>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="search-filter rounded">
                <div className="search-filter__title">
                  <span className="search-filter__dash"></span>
                  <h3 className="search-filter__title-is">
                    Search Your Products
                  </h3>
                </div>
                <div className="search-filter__content">
                  <div className="flex-grow-1">
                    <input
                      className="form-control search-filter__input"
                      type="text"
                      placeholder="Search....."
                      value={searchText}
                      onChange={(e) => setSearchText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit();
                        }
                      }}
                    />
                  </div>
                  <button
                    onClick={() => handleSubmit()}
                    type="button"
                    className="search-filter__btn"
                  >
                    <span className="search-filter__btn-text">Shop Now</span>
                    <span className="search-filter__btn-icon">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineSearchFilter;

