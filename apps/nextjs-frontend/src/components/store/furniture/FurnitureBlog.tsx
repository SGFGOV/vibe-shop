"use client";

import React from "react";
import dayjs from "dayjs";
import Link from "next/link";
import { Blog } from "@/types";

interface FurnitureBlogProps {
  blogs?: Blog[];
}

const FurnitureBlog = ({ blogs }: FurnitureBlogProps) => {
  return (
    <div className="section-space-sm-top section-space-bottom three-bg">
      <div className="section-space-sm-bottom">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-xl-6 text-center">
              <h2 className="display-6">Browse Recent Post</h2>
              <p className="mb-0">
                Interactively product distinctive paradigms whereas one-to-one
                intellectual capital. resource sucking services.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row g-4">
          {blogs?.map((blog) => (
            <div key={blog._id} className="col-md-6 col-lg-4">
              <article className="blog-card rounded-2 overflow-hidden bg-white">
                <div className="thumbnail overflow-hidden">
                  <Link href={blog.link || "#"}>
                    <img
                      src={blog.image}
                      alt="blog thumb"
                      className="img-fluid w-100"
                    />
                  </Link>
                </div>
                <div className="blog-card-content">
                  <div className="blog-meta d-flex flex-wrap align-items-center gap-3 mb-4">
                    <span className="fs-xs">
                      <i className="fa-solid fa-tags me-1"></i>
                      {blog.category}
                    </span>
                    <span className="fs-xs">
                      <i className="fa-regular fa-clock me-1"></i>
                      {dayjs(`${blog?.updatedAt}`).format(
                        "MMMM D, YYYY h:mm A"
                      )}
                    </span>
                  </div>
                  <h4 className="mb-3">
                    <Link
                      href={`/blog-details/${blog?._id}`}
                      className="clr-heading :clr-secondary"
                    >
                      {blog.title}
                    </Link>
                  </h4>
                  <p
                    className="mb-6"
                    dangerouslySetInnerHTML={{
                      __html: blog?.description || "",
                    }}
                  ></p>
                  <Link
                    href="/blog"
                    className="link d-inline-flex align-items-center gap-1 py-2 px-3 text-center rounded-1 secondary-bg bg-opacity-1 :bg-opacity-100 clr-secondary :clr-light fw-semibold"
                  >
                    <span className="d-inline-block">Explore More</span>
                    <span className="d-inline-block fs-14">
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
  );
};

export default FurnitureBlog;

