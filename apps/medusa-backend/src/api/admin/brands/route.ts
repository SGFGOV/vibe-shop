import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BrandModuleService from "../../../modules/brand/service"
import { BRAND_MODULE } from "../../../modules/brand"
import { PostAdminCreateBrandSchema } from "./validators"

// GET /admin/brands - List all brands
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const brandService: BrandModuleService = req.scope.resolve(BRAND_MODULE)
  
  const brands = await brandService.listBrands()
  
  res.json({ brands })
}

// POST /admin/brands - Create a brand
export async function POST(
  req: MedusaRequest<PostAdminCreateBrandSchema>,
  res: MedusaResponse
): Promise<void> {
  const brandService: BrandModuleService = req.scope.resolve(BRAND_MODULE)
  
  const brand = await brandService.createBrands(req.validatedBody)
  
  res.json({ brand })
}

