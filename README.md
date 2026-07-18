# Revvy

Mobile-first platform for independent auto-service businesses and their customers.

## Overview

Revvy gives auto-service shops one place to manage customers, vehicles, appointments, services, work orders, estimates, invoices, payments, and customer communication. One mobile app with role-based views for owners, employees, and customers.

## Tech Stack

- **Mobile:** React Native + Expo (TypeScript)
- **Backend:** NestJS modular monolith (TypeScript)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Supabase Auth (phone OTP)
- **Payments:** Stripe Billing + Connect
- **SMS:** Twilio
- **Monorepo:** pnpm workspaces + Turborepo

## Getting Started

### Prerequisites

- Node.js >= 20
- pnpm >= 9
- PostgreSQL (local or managed)

### Setup

```bash
# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Fill in .env with your local values

# Generate Prisma client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed the database
pnpm db:seed
```

### Development

```bash
# Start all apps in dev mode
pnpm dev

# Start only the API
pnpm --filter @revvy/api dev

# Start only the mobile app
pnpm --filter @revvy/mobile dev
```

### Useful Commands

```bash
# Run linting across all packages
pnpm lint

# Run type checking
pnpm typecheck

# Run tests
pnpm test

# Build all packages
pnpm build

# Open Prisma Studio
pnpm db:studio
```

## Repository Structure

```
revvy/
├── apps/
│   ├── mobile/          # Expo React Native app
│   └── api/             # NestJS API + worker
├── packages/
│   ├── contracts/       # Shared API DTOs and Zod schemas
│   ├── config/          # Shared TypeScript/ESLint config
│   ├── design-tokens/   # Colors, spacing, typography
│   └── test-utils/      # Test fixtures and helpers
├── prisma/
│   ├── schema.prisma    # Database schema
│   ├── migrations/      # Database migrations
│   └── seed.ts          # Database seed data
├── docs/
│   ├── architecture/    # Architecture docs
│   ├── api/             # API documentation
│   ├── decisions/       # Architecture Decision Records
│   └── runbooks/        # Operational runbooks
└── .github/workflows/   # CI/CD pipelines
```

## Documentation

- [Product Spec](REVVY_V1_SPEC.md)
- [Architecture Decision Records](docs/decisions/)
- [API Documentation](docs/api/)

## License

Proprietary - All rights reserved.
