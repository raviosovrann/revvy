# ADR-007: Media Storage and Processing

**Status:** Proposed  
**Date:** 2026-07-18

## Context

Inspection photos and documents need secure storage with controlled access.

## Decision

Pending. Options under evaluation:

- **Supabase Storage:** Natural fit if using Supabase ecosystem
- **Cloudflare R2:** No egress fees; S3-compatible API
- **AWS S3:** Most mature; higher cost

## Requirements

- Private buckets with signed URLs (short-lived)
- Image resizing for thumbnails
- MIME type and size restrictions
- Deletion lifecycle rules

## Consequences

- Signed URL lifetime must be defined (recommend 15 minutes)
- Upload limits must be enforced server-side
- Image processing adds latency; consider async resizing
