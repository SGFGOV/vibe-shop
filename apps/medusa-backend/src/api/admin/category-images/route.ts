import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ProductMediaModuleService from "../../../modules/product-media/service"
import { PRODUCT_MEDIA_MODULE } from "../../../modules/product-media"
import { PostAdminCreateCategoryImageSchema } from "./validators"

// GET /admin/category-images - List all category images
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const productMediaService: ProductMediaModuleService = req.scope.resolve(PRODUCT_MEDIA_MODULE)
  
  const categoryId = req.query.category_id as string | undefined
  
  const filters: Record<string, unknown> = {}
  if (categoryId) {
    filters.category_id = categoryId
  }
  
  const images = await productMediaService.listProductCategoryImages({
    ...filters,
  })
  
  res.json({ images })
}

// POST /admin/category-images - Create a category image
export async function POST(
  req: MedusaRequest<PostAdminCreateCategoryImageSchema>,
  res: MedusaResponse
): Promise<void> {
  const productMediaService: ProductMediaModuleService = req.scope.resolve(PRODUCT_MEDIA_MODULE)
  
  const image = await productMediaService.createProductCategoryImages({
    url: req.validatedBody.url,
    file_id: req.validatedBody.file_id || "",
    type: req.validatedBody.type,
    category_id: req.validatedBody.category_id,
  })
  
  res.json({ image })
}

