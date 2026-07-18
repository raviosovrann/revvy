# ADR-002: Database Ownership

**Status:** Accepted
**Date:** 2026-07-18  
**Deciders:** Product Owner, Engineering

## Context

Revvy needs a managed PostgreSQL instance with Prisma ORM compatibility, connection pooling, automated backups, and migration support.

## Decision

Use **Supabase Postgres** as the managed PostgreSQL provider for the pilot. Prisma remains the schema and migration owner; application traffic uses the pooled connection string and migrations use the direct connection string.

Row-level security is defense in depth, not the primary application authorization boundary. The NestJS API must still resolve an active membership and scope every business query by `shopId`.

Supabase automated backups must be enabled for staging and production, and restoration must be exercised before the pilot.

## Alternatives Considered

- **Neon:** Strong Prisma compatibility and branching, but less operational consolidation for the selected Supabase Auth stack.
- **Railway/Render managed Postgres:** Simple co-location with the API, but fewer benefits than consolidating authentication, database, and storage for the pilot.

## Consequences

- Environments require both pooled `DATABASE_URL` and direct `DIRECT_DATABASE_URL` secrets.
- Production schema changes run committed Prisma migrations with `prisma migrate deploy`; `db push` is not a deployment mechanism.
- Restore testing and provider portability remain operational requirements.
