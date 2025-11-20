"use client";

import { useState, useEffect } from "react";
import { getAllBlogs } from "../../../app/backend/controllers/blog.controller";
import { useMainContextStore } from "../provider/MainContextStore";
import { Blog } from "@/types";

interface UseBlogResult {
  blogs: Blog[];
  blogLoading: boolean;
}

const useBlog = (): UseBlogResult => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [blogLoading, setBlogLoading] = useState(true);
  // Admin context removed - blogUpdate no longer needed
  const { demo } = useMainContextStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllBlogs();
        const activeBlogs = (res as Blog[])?.filter((c) => c.status === "show") || [];
        
        const halalBlogs = activeBlogs?.filter((p) =>
          p.theme?.includes("Halal Food")
        );
        const groceryBlogs = activeBlogs.filter((p) =>
          p.theme?.includes("Grocery")
        );
        const furnitureBlogs = activeBlogs.filter((p) =>
          p.theme?.includes("Furniture")
        );

        if (demo === "Halal Food") setBlogs(halalBlogs || []);
        if (demo === "Grocery") setBlogs(groceryBlogs || []);
        if (demo === "Furniture") setBlogs(furnitureBlogs || []);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setBlogLoading(false);
      }
    };

    fetchData();
  }, [demo]);

  return { blogs, blogLoading };
};

export default useBlog;
