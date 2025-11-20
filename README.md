# vibe-shop
A custom shop built in hours instead of days that it normally takes

# GroStore Monorepo

Monorepo for GroStore e-commerce platform using Turbo.

## Structure

```
vibeshop-monorepo/
├── apps/
│   ├── nextjs/          # Next.js storefront
│   └── medusa-backend/  # MedusaJS backend
├── packages/
│   └── shared/          # Shared types and utilities
└── turbo.json           # Turbo configuration
```

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL (for MedusaJS)
- Redis (for MedusaJS)

### Installation

```bash
# Install all dependencies
npm install

# Start all apps in development mode
npm run dev

# Build all apps
npm run build

# Start all apps in production mode
npm run start
```

## Apps

### Next.js Storefront (`apps/nextjs`)

The main storefront application built with Next.js 15.

```bash
cd apps/nextjs
npm run dev
```

### MedusaJS Backend (`apps/medusa-backend`)

The e-commerce backend built with MedusaJS.

```bash
cd apps/medusa-backend
npm run dev
```

## Development

### Running Individual Apps

```bash
# Run Next.js only
npm run dev --filter=nextjs

# Run MedusaJS only
npm run dev --filter=medusa-backend
```

### Adding Dependencies

```bash
# Add to specific app
npm install <package> --workspace=apps/nextjs

# Add to root (shared)
npm install <package> -w
```

## Migration Status

See [MEDUSA_MIGRATION_PLAN.md](./apps/nextjs/MEDUSA_MIGRATION_PLAN.md) for detailed migration progress.

## License

Private

