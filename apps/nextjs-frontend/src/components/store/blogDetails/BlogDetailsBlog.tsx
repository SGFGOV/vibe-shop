"use client";

import dayjs from "dayjs";
import { Blog } from "@/types";

interface BlogDetailsBlogProps {
  id: string;
  blogs?: Blog[];
}

const BlogDetailsBlog = ({ id, blogs }: BlogDetailsBlogProps) => {
  const blogDetails = blogs?.find((b) => b._id === id);
  
  return (
    <>
      <div className="col-xl-8">
        <div className="blog-details-content bg-white rounded-2 py-6 px-5">
          <div className="thumbnail rounded-2 overflow-hidden">
            <img
              src={blogDetails?.image}
              alt="blog thumb"
              className="img-fluid"
            />
          </div>
          <div className="blog-meta d-flex align-items-center gap-3 flex-wrap mt-5">
            <span className="fs-xs fw-medium">
              <i className="fa-solid fa-tags me-2"></i>
              {blogDetails?.category}
            </span>
            <span className="fs-xs fw-medium">
              <i className="fa-regular fa-clock me-2"></i>
              {dayjs(`${blogDetails?.updatedAt}`).format("MMMM D, YYYY h:mm A")}
            </span>
          </div>
          <span className="hr-line w-100 position-relative d-block my-4"></span>
          <div
            dangerouslySetInnerHTML={{
              __html: blogDetails?.description || "",
            }}
          ></div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailsBlog;
