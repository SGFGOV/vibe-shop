import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BrandModuleService from "../../../modules/brand/service"
import { BRAND_MODULE } from "../../../modules/brand"

// GET /store/brands - List active brands (status: "show")
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const brandService: BrandModuleService = req.scope.resolve(BRAND_MODULE)
  
  // Filter brands with status "show"
  const allBrands = await brandService.listBrands()
  const brands = allBrands.filter((brand: { status: string }) => brand.status === "show")
  
  res.json({ brands })
}

