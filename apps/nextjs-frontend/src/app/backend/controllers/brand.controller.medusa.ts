// MedusaJS-based Brand Controller
// This uses the custom Brand module API endpoints

import type { Brand } from "@/types";

function getMedusaBackendUrl(): string {
  return process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";
}

interface BrandOptions {
  limit?: number;
  offset?: number;
  status?: "show" | "hide";
  next?: { tags: string[] };
}

/**
 * Get all brands using MedusaJS Custom Brand Module API
 */
export async function getAllBrands(
  options: BrandOptions = {}
): Promise<Brand[]> {
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

    const url = `${backendUrl}/store/brands${params.toString() ? `?${params.toString()}` : ""}`;
    
    const response = await fetch(url, {
      next: options.next || { tags: ["brands"] },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch brands. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.brands || [];
  } catch (error) {
    console.error("Error fetching brands from MedusaJS:", error);
    return [];
  }
}

/**
 * Get single brand by ID using MedusaJS Custom Brand Module API
 */
export async function getBrandById(id: string): Promise<Brand | null> {
  if (!id) {
    console.error("Brand ID is required");
    return null;
  }

  try {
    const backendUrl = getMedusaBackendUrl();
    const response = await fetch(`${backendUrl}/store/brands/${id}`, {
      next: { tags: ["brand", id] },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch brand. Status: ${response.status}`);
    }

    const data = await response.json();
    return data?.brand || null;
  } catch (error) {
    console.error("Error fetching brand from MedusaJS:", error);
    return null;
  }
}


