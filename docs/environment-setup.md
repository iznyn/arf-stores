# Environment Setup Guide

## Overview

This project uses different databases for local development and production to keep environments isolated and secure.

## Environment Strategy

### Local Development
- **Database**: Docker PostgreSQL (localhost:5434)
- **Purpose**: Safe local testing without affecting production data
- **Data**: Test/seed data only

### Production (Vercel)
- **Database**: Prisma Postgres (cloud)
- **Purpose**: Real production data
- **Data**: Customer orders, inventory, etc.

## Local Development Setup

### 1. Environment Variables

**File**: `.env` (root directory)

```env
# Local Development Environment
# Database - Local Docker PostgreSQL
DATABASE_URL="postgresql://store_admin:store_admin_password@localhost:5434/store_admin_db"

# NextAuth - Local Development
NEXTAUTH_SECRET="local-dev-secret-key-not-for-production"
NEXTAUTH_URL="http://localhost:3000"
```

### 2. Start Local Database

```bash
# Start Docker PostgreSQL
docker compose up -d

# Verify it's running
docker compose ps
```

### 3. Push Schema to Local Database

```bash
cd packages/database
pnpm db:push
```

### 4. Start Development Server

```bash
# From root directory
pnpm dev
```

### 5. Access Local App

Open [http://localhost:3000](http://localhost:3000)

## Production Setup (Vercel)

### 1. Environment Variables

**Location**: Vercel Dashboard → Settings → Environment Variables

**Required Variables:**

```env
DATABASE_URL="postgres://059c33adddfd711c3b70b1597ab575d02377ce2c691eac9175c0f20057eb2040:sk_Sj1K78voWIcFpNTwSNsPf@db.prisma.io:5432/postgres?sslmode=require"

NEXTAUTH_SECRET="[generate-with-openssl-rand-base64-32]"

NEXTAUTH_URL="https://your-app-name.vercel.app"
```

### 2. Generate NextAuth Secret

```bash
openssl rand -base64 32
```

Copy the output and use it as `NEXTAUTH_SECRET` in Vercel.

### 3. Set Environment Variables in Vercel

1. Go to your Vercel project
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `DATABASE_URL`
   - Value: Your Prisma Postgres URL
   - Environments: ✅ Production, ✅ Preview, ✅ Development
4. Repeat for `NEXTAUTH_SECRET` and `NEXTAUTH_URL`

### 4. Deploy

```bash
git push origin main
```

Vercel will automatically deploy with the production environment variables.

## Environment Files Reference

### `.env` (Local Development)
- ✅ **Committed to Git**: NO (in `.gitignore`)
- 🎯 **Purpose**: Local development only
- 📍 **Location**: Root directory
- 🔒 **Security**: Safe to use weak passwords

### `.env.production` (Production Template)
- ✅ **Committed to Git**: YES (template only, no real secrets)
- 🎯 **Purpose**: Documentation and reference
- 📍 **Location**: `apps/admin/.env.production`
- 🔒 **Security**: Contains placeholder values only

### Vercel Environment Variables (Production)
- ✅ **Committed to Git**: NO (stored in Vercel)
- 🎯 **Purpose**: Production deployment
- 📍 **Location**: Vercel Dashboard
- 🔒 **Security**: Real production secrets

## Database Comparison

| Feature | Local (Docker) | Production (Prisma Postgres) |
|---------|---------------|------------------------------|
| **Host** | localhost:5434 | db.prisma.io:5432 |
| **Access** | Local only | Internet (SSL required) |
| **Data** | Test data | Real production data |
| **Persistence** | Docker volume | Cloud storage |
| **Backups** | Manual | Automatic daily |
| **Cost** | Free | Free tier (256MB) |

## Switching Between Environments

### Use Local Database
```bash
# Ensure .env points to localhost
DATABASE_URL="postgresql://store_admin:store_admin_password@localhost:5434/store_admin_db"

# Start Docker
docker compose up -d

# Run dev server
pnpm dev
```

### Test with Production Database Locally (Not Recommended)
```bash
# Temporarily change .env
DATABASE_URL="postgres://[your-prisma-postgres-url]"

# Run dev server
pnpm dev
```

⚠️ **Warning**: Be careful when connecting to production database locally. You could accidentally modify real data.

## Best Practices

### ✅ DO
- Use local Docker database for development
- Keep production credentials in Vercel only
- Test thoroughly locally before deploying
- Use different `NEXTAUTH_SECRET` for local vs production
- Commit `.env.example` but never `.env`

### ❌ DON'T
- Don't commit `.env` files with real credentials
- Don't use production database for local testing
- Don't share production `DATABASE_URL` publicly
- Don't use weak `NEXTAUTH_SECRET` in production
- Don't hardcode secrets in code

## Troubleshooting

### Local Database Not Connecting

**Error**: `Can't reach database server at localhost:5434`

**Solution**:
```bash
# Check if Docker is running
docker compose ps

# Start Docker database
docker compose up -d

# Check logs
docker compose logs postgres
```

### Wrong Environment Variables

**Error**: App connects to wrong database

**Solution**:
```bash
# Check current .env
cat .env

# Verify DATABASE_URL points to localhost for local dev
# Should be: postgresql://store_admin:...@localhost:5434/...
```

### Prisma Client Out of Sync

**Error**: `Prisma Client is not generated`

**Solution**:
```bash
cd packages/database
pnpm db:generate
```

## Environment Checklist

### Local Development
- [ ] `.env` file created in root
- [ ] `DATABASE_URL` points to localhost:5434
- [ ] Docker PostgreSQL running
- [ ] Schema pushed to local database
- [ ] Dev server starts successfully

### Production Deployment
- [ ] Prisma Postgres database created in Vercel
- [ ] `DATABASE_URL` set in Vercel Dashboard
- [ ] `NEXTAUTH_SECRET` generated and set
- [ ] `NEXTAUTH_URL` set to deployment URL
- [ ] All variables set for Production environment
- [ ] Deployment successful

## Quick Reference

### Local Development Commands
```bash
# Start database
docker compose up -d

# Stop database
docker compose down

# Push schema
cd packages/database && pnpm db:push

# Open Prisma Studio (local)
cd packages/database && pnpm db:studio

# Start dev server
pnpm dev
```

### Production Commands
```bash
# Deploy to production
git push origin main

# View deployment logs
vercel logs

# Pull production env vars (for debugging)
vercel env pull .env.production.local
```

## Security Notes

1. **Never commit real credentials** - Always use `.gitignore`
2. **Rotate secrets regularly** - Update `NEXTAUTH_SECRET` periodically
3. **Use strong passwords** - Especially for production
4. **Enable SSL** - Always use `?sslmode=require` for production
5. **Limit database access** - Use IP allowlists when possible

## Support

If you need help:
1. Check this guide first
2. Review [database-setup.md](./database-setup.md)
3. Check [vercel-deployment.md](./vercel-deployment.md)
4. Review Vercel deployment logs
5. Check Docker logs: `docker compose logs postgres`
