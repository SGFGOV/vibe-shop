import { MedusaService } from "@medusajs/utils"
import { Brand } from "./models/brand"

class BrandModuleService extends MedusaService({
  Brand,
}) {
  // Custom methods can be added here if needed
  // The service factory automatically generates:
  // - createBrands()
  // - listBrands()
  // - retrieveBrand()
  // - updateBrands()
  // - deleteBrands()
}

export default BrandModuleService

