import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BlogModuleService from "../../../modules/blog/service"
import { BLOG_MODULE } from "../../../modules/blog"

// GET /store/posts - List active blog posts (status: "show")
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  
  // Filter posts with status "show"
  const allPosts = await blogService.listPosts()
  const posts = allPosts.filter((post: { status: string }) => post.status === "show")
  
  res.json({ posts })
}

