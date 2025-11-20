import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BlogModuleService from "../../../../modules/blog/service"
import { BLOG_MODULE } from "../../../../modules/blog"

interface RouteContext {
  params: Promise<{ id: string }>
}

// GET /store/posts/[id] - Get single blog post by ID
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse,
  context: RouteContext
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  const { id } = await context.params
  
  const post = await blogService.retrievePost(id)
  
  if (!post || post.status !== "show") {
    res.status(404).json({ message: "Post not found" })
    return
  }
  
  res.json({ post })
}

