# Store Admin Dashboard - Turborepo Monorepo

Daily Product Store Admin Dashboard built with Next.js, PostgreSQL, and Turborepo.

## 📦 Monorepo Structure

```
store/
├── apps/
│   └── admin/          # Admin dashboard (Next.js 16)
├── packages/
│   ├── ui/            # Shared UI components
│   ├── database/      # Prisma schema & client
│   ├── utils/         # Shared utilities
│   └── config/        # Shared configurations
├── docs/              # Documentation
└── turbo.json         # Turborepo configuration
```

## 🚀 Tech Stack

- **Framework**: Next.js 16 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: NextAuth.js
- **Monorepo**: Turborepo
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js >= 20.9.0
- pnpm >= 8.10.0
- PostgreSQL database

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Set up Environment Variables

Create `.env` file in `apps/admin`:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/store_admin"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

### 3. Run Development Server

```bash
pnpm dev
```

The admin dashboard will be available at `http://localhost:3000`

## 📝 Available Scripts

- `pnpm dev` - Start development server for all apps
- `pnpm build` - Build all apps for production
- `pnpm lint` - Lint all apps
- `pnpm clean` - Clean build artifacts

## 🏗️ Project Status

### ✅ Completed
- Turborepo monorepo setup
- Next.js 16 admin app
- Tailwind CSS configuration
- TypeScript configuration

### 🚧 In Progress
- Database schema with Prisma
- Authentication with NextAuth.js
- UI component library
- Core features implementation

## 📚 Documentation

See [Product Requirements](./docs/product-requirements.md) for detailed feature specifications.

## 🔗 Deployment

This project is optimized for deployment on Vercel with zero configuration.

## 📄 License

ISC
