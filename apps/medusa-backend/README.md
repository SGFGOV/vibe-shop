# MedusaJS Backend

E-commerce backend powered by MedusaJS with custom Brand module.

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your database and Redis credentials
   ```

3. **Set up PostgreSQL and Redis:**
   - PostgreSQL must be running
   - Redis must be running

4. **Generate and run migrations:**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Create admin user:**
   ```bash
   npx medusa user -e admin@example.com -p supersecret
   ```

6. **Start development server:**
   ```bash
   npm run dev
   ```

## Custom Modules

### Brand Module

The Brand module provides brand management functionality.

**API Endpoints:**
- `GET /admin/brands` - List all brands
- `POST /admin/brands` - Create a brand
- `GET /admin/brands/:id` - Get single brand
- `POST /admin/brands/:id` - Update brand
- `DELETE /admin/brands/:id` - Delete brand
- `GET /store/brands` - List active brands (public)

## File Storage

The application uses the **Local File Provider** for file uploads (product images, category icons, etc.). Files are stored in the `uploads` directory by default.

**Note:** The Local File Provider is for development only. For production, consider using the S3 File Module Provider or another cloud storage solution.

### Configuration

- **Upload Directory**: Set `FILE_UPLOAD_DIR` environment variable (default: `uploads`)
- **Backend URL**: Set `MEDUSA_BACKEND_URL` environment variable (default: `http://localhost:9000`)

Files uploaded through Medusa will be accessible at: `{MEDUSA_BACKEND_URL}/uploads/{filename}`

## Migration

See `src/migration-scripts/` for data migration scripts from MongoDB.

