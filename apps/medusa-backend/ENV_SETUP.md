# Environment Variables Setup Guide

This guide explains how to set up environment variables for the MedusaJS backend.

## Quick Start

1. **Copy the example file:**
   ```bash
   cd apps/medusa-backend
   cp .env.example .env
   ```

2. **Update with your values:**
   - Update `DATABASE_URL` if your PostgreSQL credentials differ
   - Update `REDIS_URL` if Redis is on a different host/port
   - Add `STRIPE_API_KEY` if you want to enable Stripe payments

3. **Start services:**
   ```bash
   # Start PostgreSQL and Redis (from project root)
   docker-compose up -d
   
   # Start Medusa backend
   npm run dev
   ```

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/medusa_db` |
| `REDIS_URL` | Redis connection string | `redis://localhost:6379` |
| `JWT_SECRET` | Secret for JWT token signing | `supersecret_jwt_key` |
| `COOKIE_SECRET` | Secret for cookie encryption | `supersecret_cookie_key` |
| `STORE_CORS` | Storefront CORS URL | `http://localhost:3000` |
| `ADMIN_CORS` | Admin CORS URL | `http://localhost:7001` |

### Optional Variables

| Variable | Description | When to Use |
|----------|-------------|-------------|
| `STRIPE_API_KEY` | Stripe secret API key | If using Stripe payments |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | If using Stripe webhooks |
| `PORT` | Server port | To change default port (9000) |
| `NODE_ENV` | Node environment | `development` or `production` |
| `FILE_UPLOAD_DIR` | Directory for local file uploads | To change default upload directory (default: `uploads`) |
| `MEDUSA_BACKEND_URL` | Backend URL for file serving | To change default backend URL (default: `http://localhost:9000`) |

## Default Configuration

The `.env` file is pre-configured with:
- **Database**: `postgresql://medusa_user:medusa_password@localhost:5432/medusa_db`
  - Matches `docker-compose.yml` configuration
- **Redis**: `redis://localhost:6379`
  - Matches `docker-compose.yml` configuration
- **CORS**: Configured for localhost development
- **Payment**: Stripe is optional (commented out)

## Docker Compose Integration

The `.env` file is configured to work with the `docker-compose.yml` file:

```yaml
# docker-compose.yml
postgres:
  environment:
    POSTGRES_USER: medusa_user
    POSTGRES_PASSWORD: medusa_password
    POSTGRES_DB: medusa_db
  ports:
    - "5432:5432"

redis:
  ports:
    - "6379:6379"
```

This matches the default `.env` configuration.

## Production Setup

For production, update these variables:

1. **Use strong secrets:**
   ```env
   JWT_SECRET=<generate-strong-random-string>
   COOKIE_SECRET=<generate-strong-random-string>
   ```

2. **Update CORS URLs:**
   ```env
   STORE_CORS=https://yourstore.com
   ADMIN_CORS=https://admin.yourstore.com
   AUTH_CORS=https://yourstore.com,https://admin.yourstore.com
   ```

3. **Use production database:**
   ```env
   DATABASE_URL=postgresql://user:pass@prod-db-host:5432/medusa_db
   ```

4. **Use production Redis:**
   ```env
   REDIS_URL=redis://prod-redis-host:6379
   ```

5. **Add Stripe keys:**
   ```env
   STRIPE_API_KEY=sk_live_...
   STRIPE_WEBHOOK_SECRET=whsec_...
   ```

## Generating Strong Secrets

Use these commands to generate strong random secrets:

```bash
# Generate JWT secret
openssl rand -base64 32

# Generate Cookie secret
openssl rand -base64 32
```

Or use Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Troubleshooting

### Database Connection Failed

1. Check if PostgreSQL is running:
   ```bash
   docker-compose ps postgres
   ```

2. Verify connection string format:
   ```
   postgresql://[user]:[password]@[host]:[port]/[database]
   ```

3. Test connection:
   ```bash
   psql postgresql://medusa_user:medusa_password@localhost:5432/medusa_db
   ```

### Redis Connection Failed

1. Check if Redis is running:
   ```bash
   docker-compose ps redis
   ```

2. Test connection:
   ```bash
   redis-cli -h localhost -p 6379 ping
   ```

### CORS Errors

1. Verify CORS URLs match your frontend/admin URLs
2. Check for trailing slashes
3. Ensure protocol matches (http vs https)

### Stripe Not Working

1. Verify `STRIPE_API_KEY` is set
2. Check if using test keys in development
3. Ensure Stripe is enabled in region (Medusa Admin)

## Next Steps

After setting up environment variables:

1. **Start services:**
   ```bash
   docker-compose up -d
   ```

2. **Run migrations:**
   ```bash
   npm run db:migrate
   ```

3. **Create admin user:**
   ```bash
   npx medusa user -e admin@example.com -p password
   ```

4. **Start Medusa:**
   ```bash
   npm run dev
   ```

5. **Access Medusa Admin:**
   - URL: `http://localhost:9000/app`
   - Login with the admin user you created

