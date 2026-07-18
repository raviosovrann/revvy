# ADR-006: Offline Behavior

**Status:** Accepted
**Date:** 2026-07-18

## Context

Shop owners and employees may have unreliable connectivity. V1 must define which screens support offline operation.

## Decision

The pilot is **online-only for mutations**. Clients may cache previously loaded screens for continuity, but cached data is clearly marked and cannot authorize or confirm a write. Mutation queues, including work-order notes and status changes, are deferred until conflict semantics are designed and tested.

Estimates, invoices, approvals, bookings, and payments always require connectivity.

## Consequences

- No mutation sync conflict resolution is required for the pilot
- No offline payment or estimate approval
- Read caches must invalidate on shop-context or account changes
