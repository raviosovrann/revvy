# Revvy V1 - Stories & Tasks

Organized by delivery phase from the V1 spec. Each story maps to a user-facing outcome with acceptance criteria and implementation tasks.

---

## Phase 0: Decisions & Discovery

### Story 0.1 - Finalize Auth Provider Decision
**Status:** Done (Supabase Auth selected - ADR-001)

### Story 0.2 - Finalize Database Hosting Decision
**Status:** Open (ADR-002)
- [ ] Evaluate Supabase Postgres vs Neon vs Railway
- [ ] Confirm Prisma compatibility and connection pooling
- [ ] Document backup and migration strategy
- [ ] Update ADR-002 with final decision

### Story 0.3 - Finalize Payment/Connect Flow Decision
**Status:** Open (ADR-003)
- [ ] Legal/accounting review of Stripe Connect options
- [ ] Determine merchant-of-record responsibilities
- [ ] Decide on destination charges vs separate accounts vs postpone
- [ ] Document refund/dispute ownership
- [ ] Update ADR-003 with final decision

### Story 0.4 - Resolve Remaining Open Questions
**Status:** Open
- [ ] Decide: public shop search vs QR/deep links only for pilot (ADR-005)
- [ ] Decide: automatic vs manual appointment confirmation
- [ ] Decide: bay/technician capacity model for pilot
- [ ] Define service categories and fixed-price examples for NYC pilot
- [ ] Define tax treatment (included vs calculated at checkout)
- [ ] Define SMS allowance and overage policy per plan
- [ ] Define Starter plan limits
- [ ] Define minimum iOS/Android versions
- [ ] Define SLO targets for API uptime and notification delivery

---

## Phase 1: Foundation

### Story 1.1 - Install Dependencies and Verify Monorepo
**Priority:** P0
- [ ] Run `pnpm install` and resolve any dependency conflicts
- [ ] Verify Turborepo task orchestration works
- [ ] Verify all workspace packages resolve correctly

### Story 1.2 - Implement Supabase Auth Token Validation (API)
**Priority:** P0
- [ ] Implement JWT validation in `AuthService.validateSupabaseToken()`
- [ ] Verify issuer, audience, signature, and expiry
- [ ] Wire `AuthGuard` to resolve user identity from token
- [ ] Add unit tests for valid, expired, and malformed tokens
- [ ] Add `GET /api/v1/me` returning authenticated user profile

### Story 1.3 - Database Setup and First Migration
**Priority:** P0
- [ ] Set up local PostgreSQL instance
- [ ] Run `prisma migrate dev` to create initial migration
- [ ] Run `prisma db seed` to populate plan entitlements
- [ ] Verify Prisma Client generation
- [ ] Add Prisma service module to NestJS app

### Story 1.4 - Error Envelope and Request ID Middleware
**Priority:** P0
- [ ] Wire `GlobalExceptionFilter` to the NestJS app
- [ ] Add request ID generation middleware (UUID)
- [ ] Ensure all error responses follow the standard envelope format
- [ ] Add integration tests for error responses

### Story 1.5 - Mobile App Shell and Navigation
**Priority:** P0
- [ ] Verify Expo app starts and renders the home screen
- [ ] Verify tab navigation works (Home, Appointments, Notifications, Profile)
- [ ] Verify auth flow screens are accessible
- [ ] Wire Supabase client initialization
- [ ] Wire auth store to Supabase session

### Story 1.6 - Design Tokens and Theme Integration
**Priority:** P1
- [ ] Verify `@revvy/design-tokens` exports are accessible in mobile
- [ ] Replace hardcoded colors in mobile screens with design tokens
- [ ] Add NativeWind/Tailwind configuration if using NativeWind

### Story 1.7 - Structured Logging
**Priority:** P1
- [ ] Add Pino HTTP logger to NestJS
- [ ] Include request ID, timestamp, environment, module in every log
- [ ] Redact sensitive fields (tokens, OTPs, auth headers)
- [ ] Add log level configuration per environment

---

## Phase 2: Identity, Shop & Team

### Story 2.1 - Owner Signup and Authentication
**Priority:** P0
- [ ] Implement phone OTP flow in mobile app via Supabase Auth
- [ ] Implement OTP verification screen
- [ ] Create or link `User` record on first authentication
- [ ] Add `PATCH /api/v1/me` for profile updates (name, phone, email)
- [ ] Add session persistence and auto-refresh
- [ ] Add logout/session revocation
- [ ] Unit tests for auth flow

### Story 2.2 - Shop Creation
**Priority:** P0
- [ ] Implement `POST /api/v1/shops` with validation
- [ ] Create `Shop`, owner `Membership`, and `ShopOnboarding` in one transaction
- [ ] Set default subscription status to `TRIALING`
- [ ] Store timezone explicitly; never infer per request
- [ ] Prevent duplicate shop creation on retry (idempotency)
- [ ] Return shop context to mobile app after creation
- [ ] Integration tests for shop creation transaction

### Story 2.3 - Shop Profile Management
**Priority:** P1
- [ ] Implement `GET /api/v1/shops/:shopId` with membership check
- [ ] Implement `PATCH /api/v1/shops/:shopId` for profile updates
- [ ] Implement `POST /api/v1/shops/:shopId/publish` (DRAFT -> PUBLISHED)
- [ ] Implement `POST /api/v1/shops/:shopId/pause` (PUBLISHED -> PAUSED)
- [ ] Implement business hours CRUD (`GET/PATCH /api/v1/shops/:shopId/hours`)
- [ ] Block public bookings until required setup is complete
- [ ] Mobile: shop settings screen for owner/manager

### Story 2.4 - Onboarding Checklist
**Priority:** P1
- [ ] Track onboarding progress in `ShopOnboarding` model
- [ ] Implement onboarding status API endpoint
- [ ] Mobile: onboarding checklist UI (shop profile, add service, invite employee, subscription)
- [ ] Mark steps complete as user performs actions
- [ ] Onboarding progress is resumable

### Story 2.5 - Employee Invitation
**Priority:** P0
- [ ] Implement `POST /api/v1/shops/:shopId/invitations` with owner permission check
- [ ] Generate random single-use token, hash before storage
- [ ] Set expiration (e.g., 7 days)
- [ ] Send SMS/email with deep link via Twilio/email provider
- [ ] Implement `POST /api/v1/shops/:shopId/invitations/:id/resend` (invalidates previous token)
- [ ] Implement `POST /api/v1/shops/:shopId/invitations/:id/revoke`
- [ ] Implement `GET /api/v1/shops/:shopId/invitations` (list pending)
- [ ] Integration tests: invitation creation, resend, revoke

### Story 2.6 - Employee Invitation Acceptance
**Priority:** P0
- [ ] Implement `POST /api/v1/invitations/:token/accept`
- [ ] Validate token hash, expiry, status, and intended contact
- [ ] Create or activate `Membership` in a transaction
- [ ] Employee sees shop name and role before acceptance
- [ ] Employee cannot alter role during acceptance
- [ ] Employee cannot create a shop as part of acceptance
- [ ] Invitation marked as `ACCEPTED` (single-use)
- [ ] Integration tests: accept once, reject double-accept, reject expired

### Story 2.7 - Team Management
**Priority:** P1
- [ ] Implement `GET /api/v1/shops/:shopId/members` (list active memberships)
- [ ] Implement `PATCH /api/v1/shops/:shopId/members/:memberId` (role change with audit)
- [ ] Implement `POST /api/v1/shops/:shopId/members/:memberId/deactivate`
- [ ] Deactivated membership blocks all shop data access
- [ ] Historical records preserved on deactivation
- [ ] Mobile: team list screen with role badges and actions

### Story 2.8 - Authorization Guards
**Priority:** P0
- [ ] Implement `ShopContextGuard` that resolves active membership from auth token + shopId
- [ ] Implement `RolesGuard` for role-based permission checks
- [ ] Every shop-scoped endpoint requires valid active membership
- [ ] Suspended/revoked/expired memberships cannot access shop data
- [ ] Customer can only access own profile, vehicles, appointments, etc.
- [ ] Technicians see only assigned work orders (unless owner grants broader access)
- [ ] Authorization tests for every shop-scoped module

---

## Phase 3: Services, Customers, Vehicles & Booking

### Story 3.1 - Service Catalog CRUD
**Priority:** P0
- [ ] Implement full CRUD for `POST/GET/PATCH /api/v1/shops/:shopId/services`
- [ ] Implement `POST /api/v1/shops/:shopId/services/:serviceId/archive`
- [ ] Implement `GET /api/v1/public/shops/:shopId/services` (public, active only)
- [ ] Validate price type semantics (FIXED_PRICE, STARTING_AT, INSPECTION_REQUIRED)
- [ ] Store monetary values as integer minor units (cents)
- [ ] Store currency code (default USD)
- [ ] Mobile: service list and create/edit screens for owner/manager

### Story 3.2 - Transparent Pricing Display
**Priority:** P0
- [ ] FIXED_PRICE: customer sees exact price
- [ ] STARTING_AT: customer sees minimum price + explanation
- [ ] INSPECTION_REQUIRED: customer sees inspection fee + "estimate required" explanation
- [ ] Never represent uncertain repair as exact fixed price
- [ ] Mobile: service price display components for each price type

### Story 3.3 - Customer Signup
**Priority:** P0
- [ ] Low-friction signup with phone OTP
- [ ] Create `Customer` record linked to `User`
- [ ] Customer enters name after OTP verification
- [ ] Mobile: customer onboarding flow

### Story 3.4 - Vehicle Management
**Priority:** P0
- [ ] Implement `GET/POST/PATCH/DELETE /api/v1/me/vehicles`
- [ ] Implement `GET /api/v1/shops/:shopId/customers/:customerId/vehicles`
- [ ] Vehicle fields: year, make, model, trim, VIN, license plate, nickname, mileage
- [ ] VIN and license plate restricted visibility
- [ ] Mobile: vehicle list and add/edit screens

### Story 3.5 - Customer-Shop Relationship
**Priority:** P1
- [ ] Create `CustomerShop` record when customer interacts with a shop
- [ ] Customer can have relationships with multiple shops
- [ ] Staff can view customer history only within their shop context
- [ ] Implement `GET/POST /api/v1/shops/:shopId/customers`

### Story 3.6 - Shop Public Profile
**Priority:** P1
- [ ] Public endpoint returning name, address, hours, services, availability
- [ ] No ranking, reviews, or marketplace logic in V1
- [ ] Deep link and QR code support for shop discovery

### Story 3.7 - Availability Calculation
**Priority:** P0
- [ ] Implement `GET /api/v1/public/shops/:shopId/availability`
- [ ] Calculate slots from business hours, service duration, existing appointments, blocked times
- [ ] Simple capacity model (configurable bays/staff)
- [ ] No sophisticated optimization in V1
- [ ] Unit tests for slot calculation logic

### Story 3.8 - Appointment Booking
**Priority:** P0
- [ ] Implement `POST /api/v1/shops/:shopId/appointments` with idempotency key
- [ ] Recheck availability inside a transaction (prevent double-booking)
- [ ] Create appointment with status REQUESTED or CONFIRMED (shop setting)
- [ ] Snapshot service price and description into `AppointmentService` line items
- [ ] Send customer and shop notifications
- [ ] Mobile: booking flow (select vehicle -> select service -> select slot -> confirm)

### Story 3.9 - Appointment Management
**Priority:** P0
- [ ] Implement `GET /api/v1/shops/:shopId/appointments` with filters (date, status, service, employee, vehicle)
- [ ] Implement `GET /api/v1/appointments/:appointmentId`
- [ ] Implement `PATCH /api/v1/appointments/:appointmentId`
- [ ] Implement confirm, cancel, reschedule, check-in endpoints
- [ ] Capture cancellation reason
- [ ] Record status transitions in `AppointmentStatusHistory`
- [ ] Mobile: appointment list and detail screens

---

## Phase 4: Jobs & Transparency Workflow

### Story 4.1 - Work Order Creation
**Priority:** P0
- [ ] Implement `POST /api/v1/shops/:shopId/work-orders` (from appointment or manual)
- [ ] Implement `GET /api/v1/shops/:shopId/work-orders` with filters
- [ ] Implement `GET /api/v1/work-orders/:workOrderId`
- [ ] Link work order to appointment (optional)
- [ ] Mobile: work order list and detail screens

### Story 4.2 - Employee Assignment
**Priority:** P0
- [ ] Implement `POST /api/v1/work-orders/:workOrderId/assign`
- [ ] One primary assignee in V1; support multiple assignments
- [ ] Validate assignee has active membership in the shop
- [ ] Technician visibility filtered by assignment

### Story 4.3 - Work Order Status Transitions
**Priority:** P0
- [ ] Implement `PATCH /api/v1/work-orders/:workOrderId/status`
- [ ] Validate status transitions (DRAFT -> SCHEDULED -> CHECKED_IN -> IN_PROGRESS -> etc.)
- [ ] Record actor, timestamp, previous/new status, optional note in `WorkOrderStatusHistory`
- [ ] Not every job uses every state
- [ ] Unit tests for all valid and invalid transitions

### Story 4.4 - Work Order Notes and Photos
**Priority:** P0
- [ ] Implement `POST /api/v1/work-orders/:workOrderId/notes`
- [ ] Implement `POST /api/v1/work-orders/:workOrderId/media`
- [ ] Photo upload to object storage with signed URLs
- [ ] MIME type, size, and dimension restrictions
- [ ] Mobile: add note and take/upload photo UI in work order detail

### Story 4.5 - Estimate Creation
**Priority:** P0
- [ ] Implement `POST /api/v1/work-orders/:workOrderId/estimates`
- [ ] Estimate contains immutable line-item snapshots, tax, discount, total
- [ ] Store all monetary values in minor units
- [ ] Implement `GET /api/v1/estimates/:estimateId`
- [ ] Mobile: estimate creation screen for staff

### Story 4.6 - Estimate Approval/Rejection
**Priority:** P0
- [ ] Implement `POST /api/v1/estimates/:estimateId/send` (marks SENT, creates notification)
- [ ] Implement `POST /api/v1/estimates/:estimateId/approve`
- [ ] Implement `POST /api/v1/estimates/:estimateId/reject`
- [ ] Record decision, actor, timestamp, optional note in `EstimateApproval`
- [ ] Whole-estimate approval only (no partial line-item approval in V1)
- [ ] Approved work can be added to work order
- [ ] Rejected work remains in history
- [ ] Customer cannot approve estimate belonging to another customer/shop
- [ ] Mobile: estimate review and approve/reject screen for customers

### Story 4.7 - Notifications System
**Priority:** P0
- [ ] Implement notification creation with idempotency key
- [ ] In-app notifications: required for all events
- [ ] Push notifications via Expo Notifications
- [ ] SMS via Twilio (transactional, opt-in/opt-out compliant)
- [ ] Email fallback for receipts and account events
- [ ] Notification types: invitation, appointment events, estimate events, invoice events, subscription events
- [ ] Delivery status tracking (PENDING, SENT, DELIVERED, FAILED)
- [ ] Mobile: notification list screen and push notification handling

### Story 4.8 - Recommended Services
**Priority:** P2
- [ ] Technician can add recommended services to a work order
- [ ] Recommendations visible to customer in work order detail
- [ ] Can be converted to estimate line items

---

## Phase 5: Invoices, Payments & Subscriptions

### Story 5.1 - Invoice Generation
**Priority:** P0
- [ ] Implement `POST /api/v1/work-orders/:workOrderId/invoices`
- [ ] Snapshot line items from completed work order
- [ ] Compute subtotal, tax, discount, total
- [ ] Implement `GET /api/v1/invoices/:invoiceId`
- [ ] Implement `POST /api/v1/invoices/:invoiceId/send`
- [ ] Mobile: invoice detail screen

### Story 5.2 - Customer Payment Flow
**Priority:** P0
- [ ] Implement `POST /api/v1/invoices/:invoiceId/payment-session`
- [ ] Create Stripe PaymentIntent / Connect payment
- [ ] Return client secret to mobile app
- [ ] Mobile: Stripe PaymentSheet integration
- [ ] Raw card data never touches Revvy servers
- [ ] Client-side success does NOT mark invoice paid

### Story 5.3 - Stripe Webhook Processing
**Priority:** P0
- [ ] Implement `POST /api/v1/webhooks/stripe`
- [ ] Verify webhook signature
- [ ] Persist webhook event before processing (idempotency via `WebhookEvent`)
- [ ] Process payment_intent events to update payment and invoice status
- [ ] Duplicate webhook delivery does not duplicate payment
- [ ] Enqueue receipt notification after successful payment

### Story 5.4 - Payment Reconciliation
**Priority:** P0
- [ ] Payment status only updated by verified webhook or authoritative Stripe API response
- [ ] Store provider payment IDs for reconciliation
- [ ] Handle refunds and disputes in data model
- [ ] Customer receives receipt notification
- [ ] Shop sees invoice as paid

### Story 5.5 - Shop Subscription Checkout
**Priority:** P0
- [ ] Implement `POST /api/v1/shops/:shopId/subscription/checkout`
- [ ] Create Stripe Billing customer and subscription
- [ ] Stripe handles payment method collection and recurring billing
- [ ] Implement `POST /api/v1/shops/:shopId/subscription/change-plan`
- [ ] Implement `POST /api/v1/shops/:shopId/subscription/cancel`
- [ ] Mobile: plan selection and subscription management screen

### Story 5.6 - Subscription Webhook Handling
**Priority:** P0
- [ ] Process Stripe subscription webhooks to update `ShopSubscription` status
- [ ] Handle TRIALING -> ACTIVE -> PAST_DUE -> CANCELLED transitions
- [ ] Implement grace period logic (read access during grace, block config changes after)
- [ ] Never delete shop data because of billing failure
- [ ] Notify owner of payment failures

### Story 5.7 - Plan Entitlements
**Priority:** P1
- [ ] Implement entitlement guard that checks plan limits before feature access
- [ ] Enforce on backend (not just client-side)
- [ ] Starter: up to 2 employees, no estimates, no online payments
- [ ] Growth: up to 8 employees, estimates, online payments
- [ ] Pro: unlimited employees, advanced analytics, custom permissions
- [ ] Plan entitlements stored centrally (not hardcoded)

### Story 5.8 - Stripe Connect Onboarding
**Priority:** P1 (depends on ADR-003)
- [ ] Implement `POST /api/v1/shops/:shopId/stripe-connect/onboarding`
- [ ] Route shop owners through Stripe Connect account setup
- [ ] Store Stripe account ID on shop record

---

## Phase 6: Hardening & Pilot

### Story 6.1 - End-to-End Test Suite
**Priority:** P0
- [ ] Owner creates shop, cannot create duplicates on retry
- [ ] Employee invitation accepted once and only once
- [ ] Shop A invitation cannot activate membership in Shop B
- [ ] Deactivated employee gets auth failure
- [ ] Customer at multiple shops without cross-shop leakage
- [ ] Fixed price displayed correctly
- [ ] Inspection-required service never shows exact final price
- [ ] Concurrent appointment submissions cannot overbook
- [ ] Technician cannot view unassigned work orders when restricted
- [ ] Customer cannot approve another customer's estimate
- [ ] Client payment success doesn't mark invoice paid without webhook
- [ ] Duplicate webhook doesn't duplicate payment
- [ ] Subscription downgrade doesn't delete data
- [ ] Private media inaccessible without signed URL
- [ ] SMS opt-out prevents non-essential SMS

### Story 6.2 - Security Review
**Priority:** P0
- [ ] Cross-shop data leakage testing on every shop-scoped endpoint
- [ ] Rate limiting: OTP, login, invitations, public booking, webhooks
- [ ] Invitation tokens hashed at rest, single-use, expiring
- [ ] Upload MIME type, size, dimension restrictions enforced server-side
- [ ] Signed URLs for private media (short-lived)
- [ ] Dependency scanning and secret scanning in CI
- [ ] Audit events for role changes, invitations, estimates, payments, sensitive profile changes
- [ ] Threat model review (spec Section 14.4)

### Story 6.3 - Monitoring and Alerts
**Priority:** P1
- [ ] Configure Sentry for API and mobile crash reporting
- [ ] Configure PostHog for product analytics events
- [ ] Set up alerts: API 5xx rate, DB unavailable, webhook failures, queue backlog
- [ ] Set up alerts: payment failure anomaly, SMS spend anomaly, OTP abuse anomaly
- [ ] Dashboard: request count, latency, error rate, active shops, active customers

### Story 6.4 - Backup and Recovery
**Priority:** P1
- [ ] Automated daily backups enabled
- [ ] Test restoration before production launch
- [ ] Document recovery steps, credentials, and RTO
- [ ] Media stored separately from database backups

### Story 6.5 - App Store Preparation
**Priority:** P1
- [ ] Configure EAS Build for iOS and Android
- [ ] App icons and splash screens
- [ ] Privacy declarations for App Store and Google Play
- [ ] Review App Store guidelines for auto-service category

### Story 6.6 - Analytics Events
**Priority:** P1
- [ ] Implement all core events from spec Section 17.2
- [ ] Events: owner_signup_completed, shop_created, shop_published, service_created, etc.
- [ ] Never include payment card details, OTPs, tokens, or unnecessary PII
- [ ] Track activation funnel: signup -> shop created -> service added -> appointment -> employee invited

### Story 6.7 - Operational Runbooks
**Priority:** P2
- [ ] Failed deployment rollback
- [ ] Database restore
- [ ] Stripe webhook replay
- [ ] Twilio outage
- [ ] Provider credential rotation
- [ ] Compromised account
- [ ] Suspected cross-tenant data exposure
- [ ] Customer refund/dispute
- [ ] Subscription payment failure

### Story 6.8 - Pilot Launch
**Priority:** P0
- [ ] Identify first pilot shops in NYC
- [ ] Configure staging environment with test Stripe/Twilio
- [ ] Deploy to production
- [ ] Onboard pilot shops
- [ ] Collect feedback and prioritize V1.1

---

## Cross-Cutting Tasks

### Analytics & Observability
- [ ] Structured logging with request ID, user ID, shop ID, operation, latency
- [ ] Metrics: API latency, DB pool saturation, queue depth, notification delivery
- [ ] Product metrics: activation funnel, booking completion, estimate approval rate

### Documentation
- [ ] OpenAPI/Swagger documentation generated from NestJS
- [ ] API error codes documented
- [ ] Environment variable documentation in `.env.example`
- [ ] Deployment and infrastructure runbooks

### Legal & Trust
- [ ] Terms of service reviewed
- [ ] Privacy policy reviewed
- [ ] SMS consent and opt-out implemented
- [ ] Payment, refund, dispute, and merchant responsibility documented
- [ ] Data retention/deletion policy documented
