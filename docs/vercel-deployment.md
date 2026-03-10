# Vercel Deployment Guide

## Overview

This guide covers deploying the Store Admin Dashboard to Vercel with PostgreSQL database.

## Prerequisites

- Vercel account (free tier available)
- GitHub repository
- PostgreSQL database (Vercel Postgres or external)

## Deployment Options

### Option 1: Vercel Postgres (Recommended - Free Tier Available)

Vercel provides managed PostgreSQL with generous free tier:
- 256 MB storage
- 60 hours compute time per month
- Perfect for development and small production apps

### Option 2: External PostgreSQL

Use any PostgreSQL provider:
- Supabase (free tier)
- Railway (free tier)
- Neon (free tier)
- AWS RDS, DigitalOcean, etc.

## Step-by-Step Deployment

### 1. Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Store Admin Dashboard"

# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/store-admin.git

# Push to GitHub
git push -u origin main
```

### 2. Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Vercel will auto-detect the Turborepo setup

### 3. Configure Project Settings

**Framework Preset:** Other (Turborepo will handle it)

**Root Directory:** Leave as root (monorepo)

**Build Command:**
```bash
turbo run build --filter=@arfcodes/store-admin
```

**Output Directory:**
```
apps/admin/.next
```

**Install Command:**
```bash
pnpm install
```

### 4. Set Up Database

#### Option A: Vercel Postgres

1. In your Vercel project dashboard, go to **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Choose a name (e.g., `store-admin-db`)
5. Select region closest to your users
6. Click **Create**

Vercel will automatically add these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` (use this for DATABASE_URL)
- `POSTGRES_URL_NON_POOLING`

#### Option B: External Database

Get your PostgreSQL connection string from your provider.

### 5. Configure Environment Variables

In Vercel Dashboard → Settings → Environment Variables, add:

```env
# Database (use POSTGRES_PRISMA_URL from Vercel Postgres or your external URL)
DATABASE_URL="postgresql://user:password@host:port/database?pgbouncer=true"

# NextAuth (generate a secure random string)
NEXTAUTH_SECRET="your-super-secret-key-min-32-characters"

# NextAuth URL (your Vercel deployment URL)
NEXTAUTH_URL="https://your-app.vercel.app"
```

**Important:** Set these for all environments (Production, Preview, Development)

### 6. Generate NextAuth Secret

```bash
# Generate a secure random string
openssl rand -base64 32
```

Copy the output and use it as `NEXTAUTH_SECRET`

### 7. Run Database Migrations

After first deployment, you need to push the schema to your database:

#### Using Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Link to your project
vercel link

# Pull environment variables
vercel env pull .env.production

# Run migration
cd packages/database
pnpm db:push
```

#### Using Local Connection

1. Get your production DATABASE_URL from Vercel
2. Temporarily set it locally:
```bash
export DATABASE_URL="your-production-database-url"
cd packages/database
pnpm db:push
```

### 8. Deploy

```bash
# Deploy to production
vercel --prod

# Or push to main branch (auto-deploys)
git push origin main
```

## Post-Deployment

### 1. Verify Deployment

Visit your deployment URL and check:
- ✅ Application loads
- ✅ No build errors
- ✅ Database connection works

### 2. Set Up Custom Domain (Optional)

1. Go to Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### 3. Monitor Performance

- Check Vercel Analytics
- Monitor database usage
- Set up error tracking (Sentry, etc.)

## Troubleshooting

### Build Fails

**Error:** `Cannot find module '@arfcodes/database'`

**Solution:** Ensure postinstall script runs:
```json
// packages/database/package.json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Database Connection Issues

**Error:** `Can't reach database server`

**Solution:** 
1. Check DATABASE_URL is correct
2. Ensure database allows connections from Vercel IPs
3. Use connection pooling URL for Vercel Postgres

### Prisma Client Not Generated

**Error:** `@prisma/client did not initialize yet`

**Solution:**
```bash
# In Vercel build logs, ensure this runs:
pnpm install  # Should trigger postinstall
```

### Environment Variables Not Working

**Solution:**
1. Verify variables are set in Vercel Dashboard
2. Redeploy after adding variables
3. Check variable names match exactly

## Performance Optimization

### 1. Enable Edge Runtime (Optional)

For faster response times, use Edge Runtime for API routes:

```typescript
// app/api/route.ts
export const runtime = 'edge';
```

### 2. Database Connection Pooling

Use PgBouncer connection string for Vercel Postgres:
```
?pgbouncer=true
```

### 3. Caching Strategy

Configure Next.js caching in `next.config.ts`:

```typescript
const nextConfig = {
  experimental: {
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },
};
```

## Monitoring & Maintenance

### 1. Set Up Monitoring

- **Vercel Analytics**: Built-in, enable in dashboard
- **Database Monitoring**: Check Vercel Postgres metrics
- **Error Tracking**: Integrate Sentry or similar

### 2. Database Backups

**Vercel Postgres:**
- Automatic daily backups (retained 7 days)
- Manual backups available in dashboard

**External Database:**
- Configure backup strategy with your provider

### 3. Scaling Considerations

**Free Tier Limits:**
- Vercel: 100GB bandwidth/month
- Vercel Postgres: 256MB storage, 60 hours compute

**When to Upgrade:**
- High traffic (>100GB/month)
- Large database (>256MB)
- Need more compute time

## Security Best Practices

1. **Never commit `.env` files** - Already in `.gitignore`
2. **Rotate secrets regularly** - Update NEXTAUTH_SECRET periodically
3. **Use strong database passwords** - Auto-generated by Vercel
4. **Enable HTTPS** - Automatic with Vercel
5. **Set up CORS** - Configure in Next.js middleware
6. **Rate limiting** - Implement for API routes

## Cost Estimation

### Free Tier (Hobby)
- **Vercel**: Free
  - 100GB bandwidth
  - Unlimited deployments
  - Custom domains
  
- **Vercel Postgres**: Free
  - 256 MB storage
  - 60 hours compute/month
  - 256 MB data transfer

### Pro Tier ($20/month)
- **Vercel Pro**: $20/month
  - 1TB bandwidth
  - Advanced analytics
  - Team collaboration
  
- **Vercel Postgres**: $10/month
  - 512 MB storage
  - 100 hours compute
  - 512 MB data transfer

## Useful Commands

```bash
# Deploy to production
vercel --prod

# Deploy preview
vercel

# View logs
vercel logs

# Pull environment variables
vercel env pull

# Link project
vercel link

# Check deployment status
vercel inspect [deployment-url]
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Postgres Documentation](https://vercel.com/docs/storage/vercel-postgres)
- [Turborepo on Vercel](https://vercel.com/docs/monorepos/turborepo)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deployment-guides/deploying-to-vercel)

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review database connection logs
3. Verify environment variables
4. Check Prisma schema sync
5. Contact Vercel support (Pro plan)
