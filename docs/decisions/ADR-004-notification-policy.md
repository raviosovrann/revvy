# ADR-004: Notification Policy

**Status:** Accepted
**Date:** 2026-07-18

## Context

Revvy sends notifications via push, SMS, email, and in-app channels. V1 must define which events use which channels, consent requirements, and opt-out behavior.

## Decision

The pilot uses:

- **In-app notifications:** Durable source of truth for all supported product events
- **Push notifications:** Primary real-time delivery channel where the user grants permission
- **Email:** Fallback for receipts and account events
- **SMS:** Narrowly scoped transactional messages only; OTP, invitations, and explicitly configured reminders

## Consequences

- SMS costs must be tracked per plan
- Opt-out must prevent non-essential SMS delivery
- Push notification permission must be requested at appropriate moments
- Every delivery attempt requires an idempotency key and observable status
