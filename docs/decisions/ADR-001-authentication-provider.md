# ADR-001: Authentication Provider

**Status:** Accepted  
**Date:** 2026-07-18  
**Deciders:** Product Owner, Engineering

## Context

Revvy V1 requires phone OTP authentication for customers and support for employees/owners. The auth provider must handle credential security, session management, and token validation while Revvy maintains its own authorization model via the Membership table.

## Decision

**Supabase Auth** is selected as the authentication provider for V1.

### Rationale

- Phone OTP and email auth are available out of the box
- Strong integration with Supabase Postgres and Storage if used
- Backend validates Supabase JWTs; authorization remains in Revvy's Membership table
- Simpler implementation surface compared to Clerk for the V1 scope
- Cost-effective for the expected user volume at launch

### Alternatives Considered

- **Clerk:** Stronger organization/invitation UI, but adds cost and complexity not justified for V1

## Consequences

- Revvy must validate Supabase JWTs on every API request
- Shop authorization is enforced by Revvy's own Membership table, not Supabase organizations
- Account deletion requires coordination between Supabase and Revvy's database
- Migration to another provider is possible but would require re-authentication of users
