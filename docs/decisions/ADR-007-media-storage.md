# ADR-007: Media Storage and Processing

**Status:** Accepted
**Date:** 2026-07-18

## Context

Inspection photos and documents need secure storage with controlled access.

## Decision

Use **Supabase Storage** with private buckets for pilot inspection photos and documents. The API authorizes access and issues signed URLs with a 15-minute lifetime. Uploads must use server-issued paths scoped by shop and work order.

## Alternatives Considered

- **Cloudflare R2:** Attractive egress profile, but adds another provider during the pilot.
- **AWS S3:** Mature and portable, but operationally broader than needed for the selected Supabase stack.

## Requirements

- Private buckets with signed URLs (short-lived)
- Image resizing for thumbnails
- MIME type and size restrictions
- Deletion lifecycle rules

## Consequences

- Signed URL lifetime must be defined (recommend 15 minutes)
- Upload limits must be enforced server-side
- Image processing adds latency; consider async resizing
- Deletion follows domain retention rules; clients never delete storage objects directly
