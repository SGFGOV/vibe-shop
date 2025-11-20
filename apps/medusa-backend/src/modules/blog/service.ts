import { MedusaService } from "@medusajs/utils"
import { Post } from "./models/post"

class BlogModuleService extends MedusaService({
  Post,
}) {
  // Custom methods can be added here if needed
  // The service factory automatically generates:
  // - createPosts()
  // - listPosts()
  // - retrievePost()
  // - updatePosts()
  // - deletePosts()
}

export default BlogModuleService

