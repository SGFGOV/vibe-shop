# Seed Data

This directory contains seed data for populating the MedusaJS database. The data was migrated from the Next.js frontend's `utils` folder.

## Data Files

- **categories.ts** - Product categories (`allCategories`)
- **brands.ts** - Product brands (`allBrands`)
- **products.ts** - Products (`allProducts`)
- **customers.ts** - Customer data (`allCustomers`)
- **blogs.ts** - Blog posts (`allBlogs`)
- **coupons.ts** - Coupons/Promotions (`allCoupons`)
- **themes.ts** - Theme settings (`allThemes`)

**Note:** The `data.js` file in the parent `seed-data` directory contains frontend UI configuration (navigation menus, theme options, etc.) and does not need to be seeded into the database. It's kept for reference only.

## Usage

To seed the database with this data, run:

```bash
npx medusa exec ./src/migration-scripts/seed.ts
```

Or add it to your package.json:

```json
{
  "scripts": {
    "seed": "medusa exec ./src/migration-scripts/seed.ts"
  }
}
```

Then run:

```bash
yarn seed
```

## Data Structure

Each file exports a constant array with the data:

- `allCategories: MongoCategory[]` - Array of categories
- `allBrands: MongoBrand[]` - Array of brands
- `allProducts: MongoProduct[]` - Array of products
- `allCustomers: MongoCustomer[]` - Array of customers

## Notes

- Products reference categories by **name** (not ID), so the migration script maps category names to Medusa category IDs
- Categories must be migrated before products
- Brands must be migrated before products (if products reference brands)
- The migration order is: Categories → Brands → Products → Customers

## Updating Seed Data

To update the seed data:

1. Update the data in the respective `.ts` files
2. Run the seed script again
3. The migration will handle creating/updating records in Medusa

