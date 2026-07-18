# ADR-004: Notification Policy

**Status:** Proposed  
**Date:** 2026-07-18

## Context

Revvy sends notifications via push, SMS, email, and in-app channels. V1 must define which events use which channels, consent requirements, and opt-out behavior.

## Decision

Pending. Initial recommendation:

- **Push notifications:** Primary channel for all real-time events (appointment updates, estimate approvals, payment receipts)
- **SMS:** Transactional only (OTP, invitation links, appointment reminders); opt-out compliant
- **Email:** Fallback for receipts and account events
- **In-app:** All notifications stored and viewable in-app

## Consequences

- SMS costs must be tracked per plan
- Opt-out must prevent non-essential SMS delivery
- Push notification permission must be requested at appropriate moments
