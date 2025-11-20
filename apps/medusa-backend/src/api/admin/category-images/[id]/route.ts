import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import ProductMediaModuleService from "../../../../modules/product-media/service"
import { PRODUCT_MEDIA_MODULE } from "../../../../modules/product-media"
import type { PostAdminUpdateCategoryImageSchema } from "../validators"

// GET /admin/category-images/:id - Get a specific category image
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const productMediaService: ProductMediaModuleService = req.scope.resolve(PRODUCT_MEDIA_MODULE)
  
  const { id } = req.params
  
  if (!id) {
    res.status(400).json({ error: "Category image ID is required" })
    return
  }
  
  const image = await productMediaService.retrieveProductCategoryImage(id)
  
  if (!image) {
    res.status(404).json({ message: "Category image not found" })
    return
  }
  
  res.json({ image })
}

// POST /admin/category-images/:id - Update a category image
export async function POST(
  req: MedusaRequest<PostAdminUpdateCategoryImageSchema>,
  res: MedusaResponse
): Promise<void> {
  const productMediaService: ProductMediaModuleService = req.scope.resolve(PRODUCT_MEDIA_MODULE)
  
  const { id } = req.params
  
  if (!id) {
    res.status(400).json({ error: "Category image ID is required" })
    return
  }
  
  const updateData: Record<string, unknown> = { id }
  if (req.validatedBody.url !== undefined) updateData.url = req.validatedBody.url
  if (req.validatedBody.file_id !== undefined) updateData.file_id = req.validatedBody.file_id
  if (req.validatedBody.type !== undefined) updateData.type = req.validatedBody.type
  
  const image = await productMediaService.updateProductCategoryImages(updateData)
  
  res.json({ image })
}

// DELETE /admin/category-images/:id - Delete a category image
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const productMediaService: ProductMediaModuleService = req.scope.resolve(PRODUCT_MEDIA_MODULE)
  
  const { id } = req.params
  
  if (!id) {
    res.status(400).json({ error: "Category image ID is required" })
    return
  }
  
  await productMediaService.deleteProductCategoryImages([id])
  
  res.status(200).json({ 
    id,
    deleted: true,
  })
}

