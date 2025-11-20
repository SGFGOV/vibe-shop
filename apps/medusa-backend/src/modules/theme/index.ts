import Service from "./service"
import { Module } from "@medusajs/utils"

export const THEME_MODULE = "themeModuleService"

export default Module(THEME_MODULE, {
  service: Service,
})

