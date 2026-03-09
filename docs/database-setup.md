# Database Setup Guide

## Overview

The Store Admin Dashboard uses PostgreSQL as the database with Prisma ORM for type-safe database access.

## Technology Stack

- **Database**: PostgreSQL 16 (Alpine)
- **ORM**: Prisma 5.22.0
- **Container**: Docker Compose
- **Port**: 5434 (to avoid conflicts)

## Quick Start

### 1. Start PostgreSQL with Docker

```bash
docker compose up -d
```

This will start PostgreSQL on `localhost:5434` with:
- **Database**: `store_admin_db`
- **User**: `store_admin`
- **Password**: `store_admin_password`

### 2. Check Database Status

```bash
docker compose ps
```

### 3. Generate Prisma Client

```bash
pnpm --filter @arfcodes/database db:generate
```

### 4. Push Schema to Database

```bash
cd packages/database
pnpm db:push
```

### 5. Open Prisma Studio (Optional)

```bash
cd packages/database
pnpm db:studio
```

## Database Schema

### Core Tables

#### User Management
- **users** - Admin users with role-based access

#### Store Management
- **stores** - Multiple store locations
- **store_inventory** - Inventory per store

#### Product Management
- **categories** - Hierarchical product categories
- **products** - Product catalog with SKU and barcode
- **product_price_history** - Track cost and selling price changes

#### Inventory Management
- **inventory_transactions** - Complete audit trail (IN/OUT/ADJUSTMENT/TRANSFER/RETURN/DAMAGE/EXPIRED)

#### Distributor & Purchase
- **distributors** - Supplier information
- **purchase_orders** - Orders from distributors
- **purchase_order_items** - Line items in purchase orders

#### Customer Management
- **customers** - Customer database
- **customer_addresses** - Multiple addresses per customer (for geographic analysis)

#### Order Management
- **orders** - Customer orders with payment status
- **order_items** - Line items in orders

#### Payment Management
- **payments** - Payment tracking with due dates
- **payment_methods** - Configurable payment options (cash, credit, bank transfer, etc.)

#### Financial Management
- **expenses** - Operational expenses (rent, utilities, salaries, etc.)

## Key Features

### 1. Inventory Flow Tracking
Every stock movement is recorded in `inventory_transactions`:
- **IN**: Purchase from distributor
- **OUT**: Customer order, damage, expired, loss
- **ADJUSTMENT**: Manual corrections
- **TRANSFER**: Between stores
- **RETURN**: Customer or distributor returns

### 2. Price History
Track both cost and selling prices over time:
- Know exact purchase cost from each distributor
- Analyze profit margins
- Historical pricing for accurate reporting

### 3. Multi-Store Support
- Separate inventory per store
- Store-specific pricing (future)
- Cross-store transfers
- Consolidated reporting

### 4. Payment Tracking
- Support delayed payments (credit terms)
- Partial payments
- Overdue tracking
- Multiple payment methods

### 5. Geographic Analytics
Customer addresses enable:
- Sales by city/region
- Product popularity by location
- Delivery route optimization

## Database Commands

### Development

```bash
# Generate Prisma Client
pnpm --filter @arfcodes/database db:generate

# Push schema changes (no migration files)
pnpm --filter @arfcodes/database db:push

# Create migration
pnpm --filter @arfcodes/database db:migrate

# Open Prisma Studio
pnpm --filter @arfcodes/database db:studio

# Seed database
pnpm --filter @arfcodes/database db:seed
```

### Docker Commands

```bash
# Start database
docker compose up -d

# Stop database
docker compose down

# Stop and remove volumes (WARNING: deletes all data)
docker compose down -v

# View logs
docker compose logs -f postgres

# Access PostgreSQL CLI
docker exec -it store-admin-db psql -U store_admin -d store_admin_db
```

## Environment Variables

Create `.env` file in the root directory:

```env
DATABASE_URL="postgresql://store_admin:store_admin_password@localhost:5434/store_admin_db"
```

## Troubleshooting

### Port Already in Use

If port 5434 is already in use, change it in `docker-compose.yml`:

```yaml
ports:
  - '5435:5432'  # Change 5434 to 5435
```

Then update `DATABASE_URL` in `.env` accordingly.

### Connection Refused

1. Check if Docker is running: `docker ps`
2. Check if PostgreSQL is healthy: `docker compose ps`
3. Check logs: `docker compose logs postgres`

### Prisma Client Not Found

Run: `pnpm --filter @arfcodes/database db:generate`

### Schema Out of Sync

Run: `pnpm --filter @arfcodes/database db:push`

## Production Considerations

1. **Use Migrations**: Switch from `db:push` to `db:migrate` for production
2. **Backup Strategy**: Set up automated backups
3. **Connection Pooling**: Use PgBouncer or Prisma Data Proxy
4. **Monitoring**: Set up database monitoring and alerts
5. **Security**: Use strong passwords and SSL connections

## Next Steps

1. Create database seeding script
2. Set up database migrations workflow
3. Add database backup automation
4. Configure connection pooling
5. Set up monitoring and alerts
