# ADR-003: Payment Money Movement

**Status:** Proposed  
**Date:** 2026-07-18  
**Deciders:** Product Owner, Engineering, Legal/Accounting

## Context

Revvy needs to handle customer invoice payments to shops. The Stripe integration must define how money flows from customer to shop, including platform fees, merchant-of-record responsibilities, and compliance requirements.

## Decision

Pending. Options under evaluation:

- **Stripe Connect (destination charges):** Revvy collects payment and routes funds to shop accounts
- **Separate direct shop accounts:** Each shop has its own Stripe account; Revvy facilitates but doesn't touch funds
- **Postpone in-app payments for V1:** Record external/cash payments first, add Stripe later

## Consequences

- Legal/accounting review required before real-money launch
- Affects Stripe onboarding flow for shop owners
- Determines refund/dispute ownership and handling
