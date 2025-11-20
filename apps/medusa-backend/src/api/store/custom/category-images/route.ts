import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ProductMediaModuleService from "../../../modules/product-media/service"
import { PRODUCT_MEDIA_MODULE } from "../../../modules/product-media"

// GET /store/category-images - List category images (public endpoint)
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

