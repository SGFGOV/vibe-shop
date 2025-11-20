import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BlogModuleService from "../../../../modules/blog/service"
import { BLOG_MODULE } from "../../../../modules/blog"
import type { PostAdminUpdatePostSchema } from "../validators"

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /admin/posts/[id] - Get single blog post by ID
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
  context: RouteContext
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  const { id } = await context.params
  
  if (!id) {
    res.status(400).json({ error: "Post ID is required" })
    return
  }
  
  const post = await blogService.retrievePost(id)
  
  if (!post) {
    res.status(404).json({ message: "Post not found" })
    return
  }
  
  res.json({ post })
}

// POST /admin/posts/[id] - Update a blog post
export async function POST(
  req: MedusaRequest<PostAdminUpdatePostSchema>,
  res: MedusaResponse,
  context: RouteContext
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  const { id } = await context.params
  
  if (!id) {
    res.status(400).json({ error: "Post ID is required" })
    return
  }
  
  const updateData = req.validatedBody
  
  const post = await blogService.updatePosts({
    id,
    ...updateData,
    updateDate: updateData?.updateDate ? new Date(updateData.updateDate) : undefined,
  })
  
  res.json({ post })
}

// DELETE /admin/posts/[id] - Delete a blog post
export async function DELETE(
  req: MedusaRequest,
  res: MedusaResponse,
  context: RouteContext
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  const { id } = await context.params
  
  if (!id) {
    res.status(400).json({ error: "Post ID is required" })
    return
  }
  
  await blogService.deletePosts(id)
  
  res.status(200).json({ id, deleted: true })
}

