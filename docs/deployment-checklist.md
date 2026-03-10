# Deployment Checklist

## Pre-Deployment

### Code & Repository
- [ ] All code committed to Git
- [ ] Repository pushed to GitHub
- [ ] `.env` files not committed (check `.gitignore`)
- [ ] Build passes locally: `pnpm build`
- [ ] No TypeScript errors: `pnpm lint`

### Database
- [ ] Prisma schema finalized
- [ ] Database migrations ready (if using migrations)
- [ ] Seed data prepared (optional)
- [ ] Database backup strategy planned

### Environment Variables
- [ ] `DATABASE_URL` prepared
- [ ] `NEXTAUTH_SECRET` generated (min 32 characters)
- [ ] `NEXTAUTH_URL` determined (your domain)
- [ ] All secrets documented (securely)

## Vercel Setup

### Project Configuration
- [ ] Vercel account created
- [ ] GitHub repository connected
- [ ] Project imported to Vercel
- [ ] Build settings configured:
  - Build Command: `turbo run build --filter=@arfcodes/store-admin`
  - Output Directory: `apps/admin/.next`
  - Install Command: `pnpm install`

### Database Setup
- [ ] Choose database option:
  - [ ] Vercel Postgres (recommended for start)
  - [ ] External PostgreSQL (Supabase, Railway, Neon, etc.)
- [ ] Database created
- [ ] Connection string obtained

### Environment Variables (Vercel Dashboard)
- [ ] `DATABASE_URL` added (all environments)
- [ ] `NEXTAUTH_SECRET` added (all environments)
- [ ] `NEXTAUTH_URL` added (production)
- [ ] Variables saved and deployment triggered

### Initial Deployment
- [ ] First deployment successful
- [ ] Build logs checked (no errors)
- [ ] Application accessible at deployment URL

### Database Migration
- [ ] Prisma Client generated (automatic via postinstall)
- [ ] Schema pushed to production database:
  ```bash
  vercel env pull .env.production
  cd packages/database
  pnpm db:push
  ```
- [ ] Database tables created successfully
- [ ] Test database connection from app

## Post-Deployment

### Verification
- [ ] Homepage loads correctly
- [ ] No console errors in browser
- [ ] Database queries working
- [ ] API routes responding
- [ ] Static assets loading

### Domain Setup (Optional)
- [ ] Custom domain added in Vercel
- [ ] DNS configured
- [ ] SSL certificate active
- [ ] `NEXTAUTH_URL` updated to custom domain

### Monitoring
- [ ] Vercel Analytics enabled
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Database monitoring configured
- [ ] Uptime monitoring (optional)

### Security
- [ ] HTTPS enforced (automatic with Vercel)
- [ ] Environment variables secured
- [ ] Database password strong
- [ ] API routes protected (when implemented)
- [ ] CORS configured (if needed)

### Documentation
- [ ] Deployment documented
- [ ] Environment variables documented
- [ ] Database credentials stored securely
- [ ] Team access configured (if applicable)

## Production Readiness

### Performance
- [ ] Build size optimized
- [ ] Images optimized
- [ ] Database queries optimized
- [ ] Caching strategy implemented

### Backup & Recovery
- [ ] Database backup enabled
- [ ] Backup restoration tested
- [ ] Disaster recovery plan documented

### Scaling Considerations
- [ ] Current tier sufficient for traffic
- [ ] Database size monitored
- [ ] Upgrade path planned

## Maintenance

### Regular Tasks
- [ ] Monitor error logs weekly
- [ ] Check database usage monthly
- [ ] Review Vercel analytics monthly
- [ ] Update dependencies quarterly
- [ ] Rotate secrets annually

### Updates
- [ ] Process for deploying updates defined
- [ ] Rollback strategy documented
- [ ] Testing process established

## Troubleshooting Reference

### Build Fails
1. Check build logs in Vercel
2. Verify all dependencies installed
3. Ensure Prisma Client generates
4. Check environment variables

### Database Connection Issues
1. Verify DATABASE_URL is correct
2. Check database is running
3. Ensure IP allowlist includes Vercel
4. Test connection locally with production URL

### Application Errors
1. Check Vercel function logs
2. Review browser console
3. Verify environment variables
4. Check database schema sync

## Quick Commands

```bash
# Deploy to production
git push origin main

# View deployment logs
vercel logs

# Pull production env vars
vercel env pull .env.production

# Run database migration
cd packages/database && pnpm db:push

# Check deployment status
vercel inspect [url]
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Next.js Documentation](https://nextjs.org/docs)

## Notes

- Keep this checklist updated as project evolves
- Document any custom deployment steps
- Share with team members
- Review before each major deployment
