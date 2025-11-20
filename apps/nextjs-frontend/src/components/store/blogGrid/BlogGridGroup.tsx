"use client";

import Link from "next/link";

const BlogGridGroup = () => {
  return (
    <>
      <div className="light-bg ptb-120">
        <div className="container">
          <div className="row justify-content-center g-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-xl-4 col-md-6">
                <article className="blog-card rounded-2 overflow-hidden bg-white border">
                  <div className="thumbnail overflow-hidden">
                    <img
                      src={`/img/blog/blog-thumb-${i}.jpg`}
                      alt="blog thumb"
                      className="img-fluid"
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                      <span className="fs-xs fw-bold">
                        <i className="fa-solid fa-tags me-1"></i>Organic
                        Vegetable
                      </span>
                      <span className="fs-xs fw-bold">
                        <i className="fa-regular fa-clock me-1"></i>May 24, 2022
                      </span>
                    </div>
                    <Link href="#">
                      <h4 className="mb-3">
                        Holiday Home Delivery We have Recently Ordered
                      </h4>
                    </Link>
                    <p className="mb-0 mb-5">
                      Holisticly exploit equity invested growth strategies
                      whereas enterpris
                    </p>
                    <Link href="#" className="btn btn-primary-light btn-md">
                      Explore More
                      <span className="ms-2">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="row g-4 justify-content-center mt-1">
            {[1, 2].map((i) => (
              <div key={i} className="col-md-6 col-xl-12 col-xxl-6">
                <article className="article-horizontal d-flex align-items-center gap-4 p-4 rounded-3">
                  <div className="thumbnail flex-shrink-0 overflow-hidden rounded-3">
                    <Link href="#">
                      <img
                        src={`/img/blog/blog-thumb-md-${i}.jpg`}
                        alt="not found"
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="article-contents">
                    <div className="blog-meta d-flex align-items-center gap-3 flex-wrap mb-2">
                      <span className="fw-medium fs-xs">
                        <i className="fa-solid fa-tags me-2"></i>Organic Vegetable
                      </span>
                      <span className="fw-medium fs-xs">
                        <i className="fa-regular fa-clock me-2"></i>May 24, 2022
                      </span>
                    </div>
                    <Link href="#">
                      <h4 className="mb-2">
                        Perfect Quality Reasonable Price For Your Family
                      </h4>
                    </Link>
                    <p className="mb-3">
                      Assertively target market lorem ipsum is onsectetur noted
                      et dolore.
                    </p>
                    <Link href="#" className="explore-btn fw-bold">
                      Explore More
                      <span className="ms-2">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
          <div className="row g-4 justify-content-center mt-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="col-xl-4 col-md-6">
                <article className="blog-card rounded-2 overflow-hidden bg-white border">
                  <div className="thumbnail overflow-hidden">
                    <img
                      src={`/img/blog/blog-thumb-${i}.jpg`}
                      alt="blog thumb"
                      className="img-fluid"
                    />
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                      <span className="fs-xs fw-bold">
                        <i className="fa-solid fa-tags me-1"></i>Organic
                        Vegetable
                      </span>
                      <span className="fs-xs fw-bold">
                        <i className="fa-regular fa-clock me-1"></i>May 24, 2022
                      </span>
                    </div>
                    <Link href="#">
                      <h4 className="mb-3">
                        Holiday Home Delivery We have Recently Ordered
                      </h4>
                    </Link>
                    <p className="mb-0 mb-5">
                      Holisticly exploit equity invested growth strategies
                      whereas enterpris
                    </p>
                    <Link href="#" className="btn btn-primary-light btn-md">
                      Explore More
                      <span className="ms-2">
                        <i className="fas fa-arrow-right"></i>
                      </span>
                    </Link>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogGridGroup;

