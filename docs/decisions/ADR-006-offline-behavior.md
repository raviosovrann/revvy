# ADR-006: Offline Behavior

**Status:** Proposed  
**Date:** 2026-07-18

## Context

Shop owners and employees may have unreliable connectivity. V1 must define which screens support offline operation.

## Decision

Pending. Initial recommendation:

- **Read-only cache:** Appointment lists, work order lists, customer profiles
- **Draft updates:** Work order notes and status changes can be queued for sync
- **No offline financial mutations:** Estimates, invoices, and payments require connectivity

## Consequences

- Sync conflict resolution needed for queued updates
- No offline payment or estimate approval
- Cache invalidation strategy required
