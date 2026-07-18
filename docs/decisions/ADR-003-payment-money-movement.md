# ADR-003: Payment Money Movement

**Status:** Accepted
**Date:** 2026-07-18  
**Deciders:** Product Owner, Engineering, Legal/Accounting

## Context

Revvy needs to handle customer invoice payments to shops. The Stripe integration must define how money flows from customer to shop, including platform fees, merchant-of-record responsibilities, and compliance requirements.

## Decision

The first pilot records customer payments collected **outside Revvy**. Authorized shop staff can record cash, card-terminal, check, bank-transfer, or other external payments against an invoice with an idempotency key and audit metadata.

Stripe Connect customer payments are deferred until the pilot validates workflow demand and legal/accounting owners approve the money-movement model. Stripe Billing remains the intended later mechanism for Revvy's own shop subscriptions and is a separate concern.

## Alternatives Considered

- **Stripe Connect destination charges:** Deferred pending merchant-of-record, fee, refund, dispute, tax, and New York compliance review.
- **Separate direct shop accounts:** Deferred because operational and reconciliation requirements still need validation.

## Consequences

- The pilot does not collect card data or move customer funds.
- External-payment recording must be staff-only, idempotent, auditable, and expressed in integer minor units.
- Customer PaymentSheet, payment-session, Connect onboarding, and customer-payment webhook stories are post-pilot.
- Legal/accounting review is still required before any future in-app customer payment launch.
