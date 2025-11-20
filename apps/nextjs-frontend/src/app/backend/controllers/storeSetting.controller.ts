/**
 * Store Setting Controller
 * This is custom functionality that may need to remain custom or be migrated to a MedusaJS custom module
 */

import type { ApiResponse } from "@/types";

interface StoreSetting {
  [key: string]: unknown;
}

/**
 * Get store setting
 * Note: API endpoint removed - functionality disabled
 */
export async function getStoreSetting(): Promise<ApiResponse<StoreSetting> | null> {
  console.warn("getStoreSetting: API endpoint /api/v1/store-setting has been removed");
    return null;
}

/**
 * Add store setting
 * Note: API endpoint removed - functionality disabled
 */
export async function addStoreSetting(
  storeSettingData: Partial<StoreSetting>
): Promise<ApiResponse<StoreSetting> | null> {
  console.warn("addStoreSetting: API endpoint /api/v1/store-setting has been removed");
    return null;
}

/**
 * Update store setting
 * Note: API endpoint removed - functionality disabled
 */
export async function updateStoreSetting(
  storeSettingData: Partial<StoreSetting>
): Promise<ApiResponse<StoreSetting> | null> {
  console.warn("updateStoreSetting: API endpoint /api/v1/store-setting has been removed");
    return null;
}

