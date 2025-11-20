import Service from "./service"
import { Module } from "@medusajs/utils"

export const BRAND_MODULE = "brand"

export default Module(BRAND_MODULE, {
  service: Service,
})

