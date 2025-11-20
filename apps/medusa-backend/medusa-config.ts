import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
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
