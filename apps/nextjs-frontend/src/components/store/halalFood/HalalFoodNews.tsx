"use client";

import dayjs from "dayjs";
import Link from "next/link";
import { Blog } from "@/types";

interface HalalFoodNewsProps {
  setting?: {
    home2?: {
      halal_food_blog_title?: string;
      halal_food_blog_text?: string;
      halal_food_blog_link?: string;
      halal_food_blog_link_text?: string;
    };
  };
  blogs?: Blog[];
}

const HalalFoodNews = ({ setting, blogs }: HalalFoodNewsProps) => {
  const halalBlogs = blogs?.filter((blog) =>
    blog.theme?.includes("Halal Food")
  );
  const title = setting?.home2?.halal_food_blog_title || "";
  const words = title.trim().split(" ");
  const lastWord = words.pop();
  const firstPart = words.join(" ");
  
  return (
    <>
      <div className="section-space-sm-top section-space-bottom">
        <div className="section-space-sm-bottom">
          <div className="container">
            <div className="row g-4 align-items-center justify-content-between">
              <div className="col-lg-5 col-xxl-4">
                <h2 className="mb-0 display-6">
                  {firstPart} <span className="meat-primary">{lastWord}</span>
                </h2>
              </div>
              <div className="col-lg-7 col-xl-6">
                <p className="mb-2">
                  {setting?.home2?.halal_food_blog_text}
                </p>
                <Link
                  href={setting?.home2?.halal_food_blog_link || "#"}
                  className="meat-category-card__btn animated-btn-icon clr-primary px-0"
                >
                  <span className="meat-category-card__btn-text fw-semibold">
                    {setting?.home2?.halal_food_blog_link_text}
                  </span>
                  <span className="meat-category-card__btn-icon">
                    <i className="fas fa-arrow-right-long"></i>
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row g-4">
            {halalBlogs?.slice(0, 3).map((blog, i) => (
              <div key={i} className="col-md-6 col-lg-4">
                <article className="blog-card rounded-2 overflow-hidden bg-white">
                  <div className="thumbnail overflow-hidden">
                    <Link href="/blog">
                      <img
                        src={blog?.image}
                        alt="blog thumb"
                        className="img-fluid w-100"
                      />
                    </Link>
                  </div>
                  <div className="blog-card-content">
                    <div className="blog-meta d-flex align-items-center gap-3 mb-1">
                      <span className="fs-xs fw-medium">
                        <i className="fa-solid fa-tags me-1"></i> {blog?.category}
                      </span>
                      <span className="fs-xs fw-medium">
                        <i className="fa-regular fa-clock me-1"></i>{" "}
                        {dayjs(`${blog?.updatedAt}`).format(
                          "MMMM D, YYYY h:mm A"
                        )}
                      </span>
                    </div>
                    <Link href="/blog">
                      <h4 className="mb-3">{blog?.title}</h4>
                    </Link>
                    <div
                      className="mb-5 overflow-hidden text-ellipsis max-h-[13ch]"
                      dangerouslySetInnerHTML={{
                        __html: blog?.description || "",
                      }}
                    ></div>
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

export default HalalFoodNews;

