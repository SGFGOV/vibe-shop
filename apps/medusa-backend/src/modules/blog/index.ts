import Service from "./service"
import { Module } from "@medusajs/utils"

export const BLOG_MODULE = "blog"

export default Module(BLOG_MODULE, {
  service: Service,
})

