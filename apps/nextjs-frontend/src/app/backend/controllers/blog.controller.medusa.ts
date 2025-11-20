// MedusaJS-based Blog Controller
// This uses the custom Blog module API endpoints

import type { Blog } from "@/types";

function getMedusaBackendUrl(): string {
  return process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
}

interface BlogOptions {
  limit?: number;
  offset?: number;
  status?: "show" | "hide";
  next?: { tags: string[] };
}

/**
 * Get all blog posts using MedusaJS Custom Blog Module API
 */
export async function getAllBlogs(
  options: BlogOptions = {}
): Promise<Blog[]> {
  try {
    const backendUrl = getMedusaBackendUrl();
    const params = new URLSearchParams();
    
    if (options.status) {
      params.append("status", options.status);
    }
    if (options.limit) {
      params.append("limit", options.limit.toString());
    }
    if (options.offset) {
      params.append("offset", options.offset.toString());
    }

    const url = `${backendUrl}/store/posts${params.toString() ? `?${params.toString()}` : ""}`;
    
    const response = await fetch(url, {
      next: options.next || { tags: ["posts"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch blog posts. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.posts || [];
  } catch (error) {
    console.error("Error fetching blog posts from MedusaJS:", error);
    return [];
  }
}

/**
 * Get single blog post by ID using MedusaJS Custom Blog Module API
 */
export async function getBlogById(id: string): Promise<Blog | null> {
  if (!id) {
    console.error("Blog ID is required");
    return null;
  }

  try {
    const backendUrl = getMedusaBackendUrl();
    const response = await fetch(`${backendUrl}/store/posts/${id}`, {
      next: { tags: ["post", id] },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch blog post. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.post || null;
  } catch (error) {
    console.error("Error fetching blog post from MedusaJS:", error);
    return null;
  }
}


