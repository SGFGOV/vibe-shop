import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BrandModuleService from "../../../../modules/brand/service"
import { BRAND_MODULE } from "../../../../modules/brand"
import type { PostAdminUpdateBrandSchema } from "../validators"

// GET /admin/brands/:id - Get single brand
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const brandService: BrandModuleService = req.scope.resolve(BRAND_MODULE)
  
  const brand = await brandService.retrieveBrand(req.params.id)
  
  res.json({ brand })
}

// POST /admin/brands/:id - Update brand
export async function POST(
  req: MedusaRequest<PostAdminUpdateBrandSchema>,
  res: MedusaResponse
): Promise<void> {
  const brandService: BrandModuleService = req.scope.resolve(BRAND_MODULE)

  if(!req.params.id) {
     res.status(400).json({ error: "Brand ID is required" })
     return;
  }
  
  const brand = await brandService.updateBrands({id: req.params.id, ...req.validatedBody})
  
  res.json({ brand })
}

// DELETE /admin/brands/:id - Delete brand
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const brandService: BrandModuleService = req.scope.resolve(BRAND_MODULE)
  
  await brandService.deleteBrands(req.params.id)
  
  res.status(200).json({ id: req.params.id, deleted: true })
}

