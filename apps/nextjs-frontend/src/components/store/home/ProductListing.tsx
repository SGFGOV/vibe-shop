"use client";

import Link from "next/link";

const ProductListing = () => {
  return (
    <>
      <section className="pt-80 pb-120">
        <div className="container">
          <div className="row justify-content-center g-4">
            <div className="col-xxl-4 col-lg-6">
              <div className="product-listing-box bg-white">
                <div className="d-flex align-items-center justify-content-between gap-3 mb-5 flex-wrap">
                  <h4 className="mb-0">New Products</h4>
                  <a
                    href="shop-grid.html"
                    className="explore-btn text-secondary fw-bold"
                  >
                    View More
                    <span className="ms-2">
                      <i className="fas fa-arrow-right"></i>
                    </span>
                  </a>
                </div>
                {/* Product cards would go here - this appears to be a static template */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductListing;

