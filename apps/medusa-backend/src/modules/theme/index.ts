import Service from "./service"
import { Module } from "@medusajs/framework/utils"

export const THEME_MODULE = "theme"

export default Module(THEME_MODULE, {
  service: Service,
})

