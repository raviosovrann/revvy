# ADR-002: Database Ownership

**Status:** Proposed  
**Date:** 2026-07-18  
**Deciders:** Product Owner, Engineering

## Context

Revvy needs a managed PostgreSQL instance with Prisma ORM compatibility, connection pooling, automated backups, and migration support.

## Decision

Pending. Options under evaluation:

- **Supabase Postgres:** Natural fit if using Supabase Auth; includes connection pooling via PgBouncer
- **Neon:** Serverless Postgres with branching; strong Prisma compatibility
- **Railway/Render managed Postgres:** Simpler deployment if API is hosted on the same platform

## Consequences

- Must be decided before Phase 1 implementation begins
- Choice affects connection string management, backup strategy, and migration tooling
