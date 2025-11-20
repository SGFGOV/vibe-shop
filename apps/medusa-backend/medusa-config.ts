import { defineConfig } from "@medusajs/utils";
import { BRAND_MODULE } from "./src/modules/brand"

export default defineConfig({
  projectConfig: {
    http:{
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:7001",
      authCors: process.env.AUTH_CORS || "http://localhost:3000,http://localhost:7001",
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
      
    },
    databaseUrl: process.env.DATABASE_URL || "postgresql://localhost:5432/medusa_db",
      redisUrl: process.env.REDIS_URL || "redis://localhost:6379"},
  modules: [
    {
      resolve: "./src/modules/brand",
    },
    {
      resolve: "./src/modules/blog",
    },
    {
      resolve: "./src/modules/theme",
    },
    {
      resolve: "./src/modules/product-media",
    },
    // File Module with local file provider
    {
      resolve: "@medusajs/medusa/file",
      options: {
        providers: [
          {
            resolve: "@medusajs/medusa/file-local",
            id: "local",
            options: {
              uploadDir: process.env.FILE_UPLOAD_DIR || "uploads",
              backendUrl: process.env.MEDUSA_BACKEND_URL || "http://localhost:9000",
            },
          },
        ],
      },
    },
    // Payment Module with providers
    {
      resolve: "@medusajs/medusa/payment",
      options: {
        providers: [
          // Manual payment provider (for COD - Cash on Delivery)
          // This is the default system provider, no configuration needed
          // It's automatically available as "system_default"
          
          // Stripe payment provider (if STRIPE_API_KEY is set)
          ...(process.env.STRIPE_API_KEY
            ? [
                {
                  resolve: "@medusajs/medusa/payment-stripe",
                  id: "stripe",
                  options: {
                    apiKey: process.env.STRIPE_API_KEY,
                    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
                    capture: true, // Auto-capture payments
                    automaticPaymentMethods: {
                      enabled: true,
                    },
                  },
                },
              ]
            : []),
        ],
      },
    },
    // Fulfillment Module with providers
    {
      resolve: "@medusajs/medusa/fulfillment",
      options: {
        providers: [
          // Manual fulfillment provider (default - for manual shipping)
          // This is the default provider, no configuration needed
          // It's automatically available as "manual"
          {
            resolve: "@medusajs/medusa/fulfillment-manual",
            id: "manual",
            options: {
              // Manual fulfillment doesn't require additional options
            },
          },
          // Add other fulfillment providers here if needed
          // For example, you can add UPS, FedEx, DHL, etc. if you have their modules
        ],
      },
    },
  ],
})

