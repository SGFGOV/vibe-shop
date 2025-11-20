import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import BlogModuleService from "../../../modules/blog/service"
import { BLOG_MODULE } from "../../../modules/blog"
import type { PostAdminCreatePostSchema } from "./validators"

// GET /admin/posts - List all blog posts
export async function GET(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  
  const posts = await blogService.listPosts()
  
  res.json({ posts })
}

// POST /admin/posts - Create a blog post
export async function POST(
  req: MedusaRequest<PostAdminCreatePostSchema>,
  res: MedusaResponse
): Promise<void> {
  const blogService: BlogModuleService = req.scope.resolve(BLOG_MODULE)
  
  const postData = req.validatedBody
  
  const post = await blogService.createPosts({
    ...postData,
    updateDate: postData.updateDate ? new Date(postData.updateDate) : undefined,
  })
  
  res.json({ post })
}

