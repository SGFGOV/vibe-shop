import {
  defineMiddlewares,
  authenticate,
  validateAndTransformBody,
} from "@medusajs/framework/http";
import {
  PostAdminCreateBrandSchema,
  PostAdminUpdateBrandSchema,
} from "./admin/custom/brands/validators";
import {
  PostAdminCreatePostSchema,
  PostAdminUpdatePostSchema,
} from "./admin/custom/posts/validators";
import {
  PostAdminCreateThemeSchema,
  PostAdminUpdateThemeSchema,
} from "./admin/custom/themes/validators";
import {
  PostAdminCreateCategoryImageSchema,
  PostAdminUpdateCategoryImageSchema,
} from "./admin/custom/category-images/validators";

/**
 * API Middleware Configuration
 * 
 * This file configures authentication and validation middleware for custom API routes.
 * 
 * - Admin routes (/admin/*) require authentication as admin user
 * - Store routes (/store/*) are public by default
 */
export default defineMiddlewares({
  routes: [
    // Protect all admin brand routes - require admin authentication
    {
      matcher: "/admin/brands*",
      middlewares: [
        authenticate("user", ["session", "bearer", "api-key"]),
      ],
    },
    // Validate request body for creating a brand
    {
      matcher: "/admin/brands",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminCreateBrandSchema as any),
      ],
    },
    // Validate request body for updating a brand
    {
      matcher: "/admin/brands/:id",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminUpdateBrandSchema as any),
      ],
    },
    // Protect all admin blog post routes - require admin authentication
    {
      matcher: "/admin/posts*",
      middlewares: [
        authenticate("user", ["session", "bearer", "api-key"]),
      ],
    },
    // Validate request body for creating a blog post
    {
      matcher: "/admin/posts",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminCreatePostSchema as any),
      ],
    },
    // Validate request body for updating a blog post
    {
      matcher: "/admin/posts/:id",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminUpdatePostSchema as any),
      ],
    },
    // Validate request body for creating a theme
    // Note: Admin routes are already protected by default, no need for explicit auth middleware
    {
      matcher: "/admin/themes",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminCreateThemeSchema as any),
      ],
    },
    // Validate request body for updating a theme
    {
      matcher: "/admin/themes/:id",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminUpdateThemeSchema as any),
      ],
    },
    // Store brand routes are public (no authentication required)
    // If you want to protect store routes, uncomment the following:
    // {
    //   matcher: "/store/brands*",
    //   middlewares: [
    //     authenticate("customer", ["session", "bearer"]),
    //   ],
    // },
    // Store blog post routes are public (no authentication required)
    // If you want to protect store routes, uncomment the following:
    // {
    //   matcher: "/store/posts*",
    //   middlewares: [
    //     authenticate("customer", ["session", "bearer"]),
    //   ],
    // },
    // Store theme routes are public (no authentication required)
    // GET /store/themes returns the active theme for the storefront
    // Allow theme field in category API routes
    // Note: This is handled by custom category routes that include themes
    // The built-in category routes don't need this middleware
    // Protect all admin category-images routes - require admin authentication
    {
      matcher: "/admin/category-images*",
      middlewares: [
        authenticate("user", ["session", "bearer", "api-key"]),
      ],
    },
    // Validate request body for creating a category image
    {
      matcher: "/admin/category-images",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminCreateCategoryImageSchema as any),
      ],
    },
    // Validate request body for updating a category image
    {
      matcher: "/admin/category-images/:id",
      method: ["POST"],
      middlewares: [
        validateAndTransformBody(PostAdminUpdateCategoryImageSchema as any),
      ],
    },
    // Store category-images routes are public (no authentication required)
    // GET /store/category-images returns category images for the storefront
  ],
});

