import Service from "./service"
import { Module } from "@medusajs/utils"

export const BRAND_MODULE = "brandModuleService"

export default Module(BRAND_MODULE, {
  service: Service,
})

