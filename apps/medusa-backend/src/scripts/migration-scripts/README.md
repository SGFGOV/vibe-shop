# Migration Scripts

This directory contains scripts to migrate data from MongoDB to MedusaJS.

## Migration Order

**IMPORTANT:** Migrations must be run in this order:

1. **Categories** - Must be migrated first (parents before children)
2. **Brands** - Migrated via custom Brand module
3. **Products** - Depends on categories and brands
4. **Customers** - Independent, can be migrated anytime
5. **Orders** - Optional, depends on products and customers

## Usage

### Option 1: Run Full Migration

```typescript
import { runFullMigration } from "./migration-scripts";
import { sdk } from "@medusajs/js-sdk";

// Prepare your MongoDB data
const mongoData = {
  categories: [...], // From MongoDB
  brands: [...],      // From MongoDB
  products: [...],   // From MongoDB
  customers: [...],  // From MongoDB
};

// Run migration
const summary = await runFullMigration(sdk.admin, mongoData);
```

### Option 2: Run Individual Migrations

```typescript
import { 
  migrateCategories, 
  migrateProducts, 
  migrateCustomers 
} from "./migration-scripts";
import { sdk } from "@medusajs/js-sdk";

// 1. Migrate categories first
const categoryResult = await migrateCategories(sdk.admin, mongoCategories);

// 2. Migrate products (requires category map)
const productResult = await migrateProducts(
  sdk.admin, 
  mongoProducts, 
  categoryResult.categoryMap
);

// 3. Migrate customers
const customerResult = await migrateCustomers(sdk.admin, mongoCustomers);
```

### Option 3: Brand Migration (Custom Module)

Brands require the Brand module service:

```typescript
import { migrateBrands } from "./brands";
import BrandModuleService from "../modules/brand/service";
import { BRAND_MODULE } from "../modules/brand";

// Get brand service from container
const brandService = container.resolve<BrandModuleService>(BRAND_MODULE);

// Migrate brands
const brandResult = await migrateBrands(brandService, mongoBrands);
```

## Prerequisites

1. **Medusa Backend Running**: Ensure Medusa backend is running
2. **Database Setup**: PostgreSQL database must be initialized
3. **Regions**: At least one region must exist in Medusa
4. **Admin SDK**: Admin SDK must be configured with proper credentials

## Data Preparation

Before running migrations, you need to:

1. **Export data from MongoDB**:
   ```javascript
   // Example MongoDB query
   const categories = await Category.find({});
   const brands = await Brand.find({});
   const products = await Product.find({});
   const customers = await User.find({ role: "Customer" });
   ```

2. **Transform to migration format**:
   - Ensure all required fields are present
   - Handle missing/null values appropriately
   - Map relationships (e.g., category IDs)

## Notes

- **Categories**: Parent categories are migrated before children
- **Products**: 
  - **CRITICAL**: Prices are stored on variants, NOT products
  - Every product MUST have at least one variant with prices
  - Products without variants get a default variant created with the product price
  - Each variant must have a `prices` array with at least one price object
- **Prices**: 
  - All prices are converted from dollars to cents (×100)
  - Price format: `{ amount: number (in cents), currency_code: string, rules?: { region_id: string } }`
  - Prices can be currency-based (just currency_code) or region-specific (with region_id in rules)
- **Status Mapping**: 
  - `"show"` → `"published"` (products) or `true` (categories)
  - `"hide"` → `"draft"` (products) or `false` (categories)
- **Customers**: Only users with role "Customer" are migrated

## Error Handling

All migration scripts:
- Log progress to console
- Continue on individual item failures
- Return summary with success/failure counts
- Provide detailed error messages

## Testing

Before running full migration:

1. Test with a small subset of data
2. Verify data integrity in Medusa Admin
3. Check relationships (products → categories, etc.)
4. Validate prices and inventory quantities

## Rollback

If migration fails:
1. Keep MongoDB data intact (read-only during migration)
2. Clear Medusa database if needed: `npx medusa db:reset`
3. Fix issues and re-run migration

