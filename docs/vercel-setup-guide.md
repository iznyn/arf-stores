# Vercel Setup Guide - Step by Step

## Prerequisites

- ✅ GitHub account
- ✅ Vercel account (free) - Sign up at [vercel.com](https://vercel.com)
- ✅ Code pushed to GitHub repository

## Step 1: Push Your Code to GitHub

### 1.1 Create GitHub Repository

1. Go to [github.com/new](https://github.com/new)
2. Repository name: `store-admin` (or your preferred name)
3. Keep it **Private** (recommended) or Public
4. **DO NOT** initialize with README (we already have one)
5. Click **Create repository**

### 1.2 Push Your Code

```bash
# In your project directory: /Users/iznyn/Projects/arfcodes/src/store

# Check git status
git status

# Add all files
git add .

# Commit
git commit -m "feat: complete store admin dashboard with database"

# Add GitHub remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/store-admin.git

# Push to GitHub
git push -u origin main
```

**If you get an error about 'main' branch:**
```bash
# Rename branch to main
git branch -M main

# Then push again
git push -u origin main
```

## Step 2: Connect Vercel to GitHub

### 2.1 Sign Up/Login to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up** (or **Login** if you have an account)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### 2.2 Import Your Repository

1. On Vercel Dashboard, click **Add New...** → **Project**
2. You'll see "Import Git Repository"
3. Find your `store-admin` repository in the list
4. Click **Import**

**If you don't see your repository:**
- Click **Adjust GitHub App Permissions**
- Select your repository
- Click **Install**

## Step 3: Configure Project Settings

Vercel will auto-detect your project. Configure these settings:

### 3.1 Framework Preset
- **Framework Preset**: Other (Vercel will detect Turborepo)
- ✅ Leave as detected

### 3.2 Root Directory
- **Root Directory**: `.` (leave as root)
- ✅ This is correct for monorepo

### 3.3 Build Settings

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

**Development Command:**
```bash
turbo run dev --filter=@arfcodes/store-admin
```

### 3.4 Node.js Version
- **Node.js Version**: 22.x (should auto-detect from `.nvmrc`)

## Step 4: Set Up Prisma Postgres Database

### 4.1 Create Database

1. In your Vercel project, click **Storage** tab
2. Click **Create Database**
3. Select **Prisma Postgres**
4. Database name: `store-admin-db`
5. Region: Choose closest to your users (e.g., US East, Singapore, etc.)
6. Click **Create**

**Wait 1-2 minutes** for database to be created.

### 4.2 Verify Database Connection

Vercel automatically adds these environment variables:
- `POSTGRES_URL`
- `POSTGRES_PRISMA_URL` ← **Use this one**
- `POSTGRES_URL_NON_POOLING`

## Step 5: Add Environment Variables

### 5.1 Go to Environment Variables

1. In your Vercel project, click **Settings**
2. Click **Environment Variables** (left sidebar)

### 5.2 Add DATABASE_URL

- **Name**: `DATABASE_URL`
- **Value**: Copy from `POSTGRES_PRISMA_URL` (should already be there)
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

**If POSTGRES_PRISMA_URL is not there:**
Use this format:
```
postgres://[user]:[password]@[host]:5432/[database]?sslmode=require
```

### 5.3 Generate and Add NEXTAUTH_SECRET

**On your local machine, run:**
```bash
openssl rand -base64 32
```

**Copy the output**, then in Vercel:
- **Name**: `NEXTAUTH_SECRET`
- **Value**: Paste the generated secret
- **Environments**: ✅ Production, ✅ Preview, ✅ Development
- Click **Save**

### 5.4 Add NEXTAUTH_URL

- **Name**: `NEXTAUTH_URL`
- **Value**: `https://your-project-name.vercel.app` (get this after first deployment)
- **Environments**: ✅ Production only
- Click **Save**

**Note**: You can add this after first deployment when you know your URL.

## Step 6: Deploy

### 6.1 First Deployment

Click **Deploy** button in Vercel.

Vercel will:
1. Clone your repository
2. Install dependencies with `pnpm install`
3. Generate Prisma Client (automatic via postinstall)
4. Build your app with Turborepo
5. Deploy to production

**Wait 2-5 minutes** for deployment to complete.

### 6.2 Check Deployment Status

Watch the build logs:
- ✅ Installing dependencies
- ✅ Generating Prisma Client
- ✅ Building application
- ✅ Deployment ready

### 6.3 Get Your Deployment URL

After successful deployment:
1. Click **Visit** or **View Deployment**
2. Your URL will be: `https://your-project-name.vercel.app`
3. Copy this URL

### 6.4 Update NEXTAUTH_URL

1. Go back to **Settings** → **Environment Variables**
2. Find `NEXTAUTH_URL`
3. Update value to your actual deployment URL
4. Click **Save**
5. **Redeploy** (Deployments → ⋯ → Redeploy)

## Step 7: Verify Everything Works

### 7.1 Check Your App

Visit your deployment URL:
- ✅ Page loads without errors
- ✅ No 500 errors
- ✅ Database connection works

### 7.2 Check Build Logs

If something fails:
1. Go to **Deployments** tab
2. Click on the failed deployment
3. Click **View Build Logs**
4. Look for errors

## Common Issues & Solutions

### Issue: Build Fails - "Cannot find module @arfcodes/database"

**Solution**: Ensure `postinstall` script exists in `packages/database/package.json`:
```json
"scripts": {
  "postinstall": "prisma generate"
}
```

### Issue: Database Connection Error

**Solution**: 
1. Check `DATABASE_URL` is set correctly
2. Verify it uses `POSTGRES_PRISMA_URL` value
3. Ensure it includes `?sslmode=require`

### Issue: Environment Variables Not Working

**Solution**:
1. Verify variables are saved in Vercel
2. Redeploy after adding variables
3. Check variable names match exactly (case-sensitive)

### Issue: "NEXTAUTH_URL" Error

**Solution**:
1. Set `NEXTAUTH_URL` to your Vercel deployment URL
2. Must include `https://`
3. No trailing slash
4. Redeploy after setting

## Step 8: Set Up Custom Domain (Optional)

### 8.1 Add Domain

1. Go to **Settings** → **Domains**
2. Enter your domain (e.g., `admin.yourstore.com`)
3. Click **Add**

### 8.2 Configure DNS

Follow Vercel's instructions to add DNS records:
- **Type**: CNAME or A record
- **Name**: Your subdomain
- **Value**: Vercel's provided value

### 8.3 Update NEXTAUTH_URL

After domain is active:
1. Update `NEXTAUTH_URL` to your custom domain
2. Redeploy

## Step 9: Continuous Deployment

Now every time you push to GitHub:

```bash
git add .
git commit -m "your changes"
git push origin main
```

Vercel will automatically:
1. Detect the push
2. Build your app
3. Deploy to production

## Quick Reference

### Deploy New Changes
```bash
git add .
git commit -m "feat: add new feature"
git push origin main
```

### View Logs
```bash
vercel logs
```

### Pull Environment Variables
```bash
vercel env pull
```

### Rollback Deployment
1. Go to **Deployments**
2. Find previous working deployment
3. Click **⋯** → **Promote to Production**

## Next Steps

After successful deployment:
- [ ] Set up custom domain
- [ ] Configure analytics
- [ ] Set up error tracking (Sentry)
- [ ] Add team members
- [ ] Set up preview deployments for branches

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Turborepo on Vercel](https://vercel.com/docs/monorepos/turborepo)
