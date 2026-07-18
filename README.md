# Revvy

Mobile-first platform for independent auto-service businesses and their customers.

## Overview

Revvy gives auto-service shops one place to manage customers, vehicles, appointments, services, work orders, estimates, invoices, payments, and customer communication. One mobile app with role-based views for owners, employees, and customers.

## Tech Stack

- **Mobile:** React Native + Expo (TypeScript)
- **Backend:** NestJS modular monolith (TypeScript)
- **Database:** PostgreSQL with Prisma ORM
- **Auth:** Supabase Auth (phone OTP)
- **Pilot payments:** External collection recorded by authorized shop staff
- **Shop subscriptions:** Stripe Billing (later production phase)
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

# Apply committed database migrations
pnpm db:migrate:deploy

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

Development builds expose `/role-picker` for product demos. Set
`EXPO_PUBLIC_ENABLE_ROLE_PICKER=false` to exercise the real Supabase OTP entry flow; production
builds always enter the authenticated flow.

## Implemented production slice

The registered API surface is intentionally limited to the implemented foundation and first
owner slice:

- Supabase access-token validation and local user resolution
- Idempotent owner shop creation with owner membership, onboarding, and trial subscription
- Shop-scoped, role-authorized service creation, publishing, and archiving
- Idempotent external-payment recording for authorized shop staff
- Request IDs, structured/redacted HTTP logs, standard error envelopes, and health endpoints

Other domain modules remain source scaffolds and are not registered in `AppModule` until their
authorization, persistence, contracts, and tests are implemented.

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

CI uses `prisma migrate deploy` against an ephemeral PostgreSQL database. It never uses
`prisma db push`, and lint commands do not rewrite source files.

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
