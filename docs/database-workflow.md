# Database Workflow Guide

## Overview

Your database package (`packages/database`) is shared between local development and production. Here's how to manage migrations, seeding, and Prisma Client generation.

## 📁 Project Structure

```
store/
├── packages/
│   └── database/              ← Database package (shared)
│       ├── prisma/
│       │   └── schema.prisma  ← Single source of truth
│       ├── src/
│       │   └── index.ts       ← Prisma Client export
│       └── package.json       ← Database scripts
│
└── apps/
    └── admin/                 ← Admin app (uses database package)
        └── package.json       ← Depends on @arfcodes/database
```

## 🔧 Database Commands

### From Root Directory

All database commands should be run from the **root directory** using pnpm filters:

```bash
# Generate Prisma Client
pnpm --filter @arfcodes/database db:generate

# Push schema to database (development)
pnpm --filter @arfcodes/database db:push

# Create migration (production-ready)
pnpm --filter @arfcodes/database db:migrate

# Open Prisma Studio
pnpm --filter @arfcodes/database db:studio

# Seed database
pnpm --filter @arfcodes/database db:seed
```

### From Database Package Directory

Or navigate to the package:

```bash
cd packages/database

# Generate Prisma Client
pnpm db:generate

# Push schema
pnpm db:push

# Create migration
pnpm db:migrate

# Open Prisma Studio
pnpm db:studio

# Seed database
pnpm db:seed
```

## 🏠 Local Development Workflow

### 1. Start Local Database

```bash
# From root directory
docker compose up -d
```

### 2. Make Schema Changes

Edit `packages/database/prisma/schema.prisma`:

```prisma
model Product {
  id          String   @id @default(cuid())
  name        String
  // Add new field
  description String?  // ← New field
  // ...
}
```

### 3. Push Schema to Local Database

```bash
# From root
pnpm --filter @arfcodes/database db:push

# Or from packages/database
cd packages/database
pnpm db:push
```

**What happens:**
- ✅ Schema changes applied to local Docker database
- ✅ Prisma Client regenerated automatically
- ✅ No migration files created (quick for development)

### 4. Verify Changes

```bash
# Open Prisma Studio to view data
pnpm --filter @arfcodes/database db:studio
```

### 5. Test in Admin App

```bash
# From root
pnpm dev

# Admin app will use the updated Prisma Client
```

## 🚀 Production Workflow

### 1. Create Migration (Production-Ready)

When you're ready to deploy schema changes:

```bash
cd packages/database

# Create migration with descriptive name
pnpm db:migrate
# Enter migration name: "add_product_description"
```

**What happens:**
- ✅ Migration file created in `prisma/migrations/`
- ✅ Migration applied to local database
- ✅ Prisma Client regenerated
- ✅ Migration tracked in Git

### 2. Commit Migration

```bash
git add packages/database/prisma/migrations/
git commit -m "feat: add product description field"
git push origin main
```

### 3. Deploy to Vercel

When you push to GitHub:
- ✅ Vercel detects changes
- ✅ Runs `pnpm install` (triggers `postinstall` → `prisma generate`)
- ✅ Builds your app
- ✅ **Migrations are NOT auto-applied** (for safety)

### 4. Apply Migration to Production Database

**Option A: Using Vercel CLI (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull production environment variables
vercel env pull .env.production.local

# Apply migration to production
cd packages/database
pnpm db:migrate deploy
```

**Option B: Manual SQL (Advanced)**

1. Get migration SQL from `prisma/migrations/[timestamp]_[name]/migration.sql`
2. Connect to production database
3. Run SQL manually

**Option C: Prisma Studio (Not Recommended for Production)**

Use only for emergency fixes, not for regular deployments.

## 🌱 Database Seeding

### Create Seed Script

Create `packages/database/src/seed.ts`:

```typescript
import { prisma } from './index';

async function main() {
  console.log('🌱 Seeding database...');

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic products',
    },
  });

  // Create products
  await prisma.product.createMany({
    data: [
      {
        name: 'Laptop',
        sku: 'ELEC-001',
        categoryId: electronics.id,
        currentSellingPrice: 15000000,
        currentCostPrice: 12000000,
      },
      {
        name: 'Mouse',
        sku: 'ELEC-002',
        categoryId: electronics.id,
        currentSellingPrice: 150000,
        currentCostPrice: 100000,
      },
    ],
  });

  console.log('✅ Seeding complete!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

### Run Seed Script

**Local:**
```bash
cd packages/database
pnpm db:seed
```

**Production:**
```bash
# Pull production env vars
vercel env pull .env.production.local

# Run seed with production DATABASE_URL
cd packages/database
pnpm db:seed
```

## 🔄 Common Workflows

### Workflow 1: Add New Table

```bash
# 1. Edit schema
vim packages/database/prisma/schema.prisma

# 2. Push to local database (quick test)
cd packages/database
pnpm db:push

# 3. Test in app
cd ../..
pnpm dev

# 4. Create migration for production
cd packages/database
pnpm db:migrate
# Name: "add_supplier_table"

# 5. Commit and deploy
git add .
git commit -m "feat: add supplier table"
git push origin main

# 6. Apply to production
vercel env pull .env.production.local
cd packages/database
pnpm db:migrate deploy
```

### Workflow 2: Modify Existing Table

```bash
# 1. Edit schema
vim packages/database/prisma/schema.prisma

# 2. Push to local (development)
cd packages/database
pnpm db:push

# 3. Create migration (production)
pnpm db:migrate
# Name: "add_product_barcode"

# 4. Deploy
git add .
git commit -m "feat: add barcode to products"
git push origin main

# 5. Apply to production
vercel env pull .env.production.local
cd packages/database
pnpm db:migrate deploy
```

### Workflow 3: Reset Local Database

```bash
# Stop and remove database
docker compose down -v

# Start fresh database
docker compose up -d

# Push schema
cd packages/database
pnpm db:push

# Seed data
pnpm db:seed
```

### Workflow 4: View Database Data

```bash
# Open Prisma Studio
cd packages/database
pnpm db:studio

# Opens browser at http://localhost:5555
# View and edit data visually
```

## 📊 Migration vs Push

### `db:push` (Development)
- ✅ **Use for**: Local development, quick iterations
- ✅ **Pros**: Fast, no migration files
- ❌ **Cons**: No history, can lose data
- 🎯 **When**: Prototyping, testing schema changes

### `db:migrate` (Production)
- ✅ **Use for**: Production deployments
- ✅ **Pros**: Version controlled, safe, reversible
- ❌ **Cons**: Slower, creates files
- 🎯 **When**: Ready to deploy to production

## 🔒 Production Safety

### Before Deploying Schema Changes

1. **Test locally first**
   ```bash
   pnpm db:push  # Test on local database
   ```

2. **Create migration**
   ```bash
   pnpm db:migrate  # Create migration file
   ```

3. **Review migration SQL**
   ```bash
   cat prisma/migrations/[timestamp]_[name]/migration.sql
   ```

4. **Backup production database** (if critical)
   - Use Vercel Postgres backup feature
   - Or manual pg_dump

5. **Apply migration**
   ```bash
   pnpm db:migrate deploy
   ```

## 🚨 Troubleshooting

### Prisma Client Not Found

**Error**: `Cannot find module '@prisma/client'`

**Solution**:
```bash
cd packages/database
pnpm db:generate
```

### Schema Out of Sync

**Error**: `Prisma schema is out of sync with database`

**Solution**:
```bash
cd packages/database
pnpm db:push  # For local
# OR
pnpm db:migrate deploy  # For production
```

### Migration Failed

**Error**: Migration fails on production

**Solution**:
```bash
# Check migration status
cd packages/database
pnpm prisma migrate status

# Resolve migration
pnpm prisma migrate resolve --applied [migration_name]
# OR
pnpm prisma migrate resolve --rolled-back [migration_name]
```

### Database Connection Error

**Error**: `Can't reach database server`

**Local:**
```bash
docker compose ps  # Check if running
docker compose up -d  # Start if stopped
```

**Production:**
```bash
# Verify DATABASE_URL in Vercel Dashboard
# Check database is active in Vercel Storage
```

## 📋 Quick Reference

### Essential Commands

```bash
# Generate Prisma Client
pnpm --filter @arfcodes/database db:generate

# Development: Push schema
pnpm --filter @arfcodes/database db:push

# Production: Create migration
pnpm --filter @arfcodes/database db:migrate

# Production: Apply migration
pnpm --filter @arfcodes/database db:migrate deploy

# View data
pnpm --filter @arfcodes/database db:studio

# Seed database
pnpm --filter @arfcodes/database db:seed
```

### File Locations

- **Schema**: `packages/database/prisma/schema.prisma`
- **Migrations**: `packages/database/prisma/migrations/`
- **Seed**: `packages/database/src/seed.ts`
- **Client**: `packages/database/src/index.ts`

### Environment Files

- **Local**: `.env` (root directory)
- **Production**: Vercel Dashboard → Environment Variables

## 🎯 Best Practices

1. ✅ **Always test locally first** with `db:push`
2. ✅ **Create migrations** before deploying with `db:migrate`
3. ✅ **Review migration SQL** before applying to production
4. ✅ **Commit migrations** to Git
5. ✅ **Use descriptive migration names**
6. ✅ **Backup production** before major schema changes
7. ✅ **Never edit migration files** after they're created
8. ✅ **Use seed scripts** for test data
9. ✅ **Document schema changes** in commit messages
10. ✅ **Test migrations** on staging before production (if available)

## 📖 Additional Resources

- [Prisma Migrations Guide](https://www.prisma.io/docs/concepts/components/prisma-migrate)
- [Prisma Schema Reference](https://www.prisma.io/docs/reference/api-reference/prisma-schema-reference)
- [Vercel Postgres Docs](https://vercel.com/docs/storage/vercel-postgres)
