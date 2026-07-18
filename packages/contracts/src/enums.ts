import { z } from 'zod';

export const MembershipStatus = z.enum(['INVITED', 'ACTIVE', 'SUSPENDED', 'DEACTIVATED']);
export const InvitationStatus = z.enum(['PENDING', 'ACCEPTED', 'REVOKED', 'EXPIRED']);
export const ShopStatus = z.enum(['DRAFT', 'PUBLISHED', 'PAUSED', 'ARCHIVED']);
export const AppointmentStatus = z.enum([
  'REQUESTED', 'CONFIRMED', 'RESCHEDULED', 'CHECKED_IN',
  'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'NO_SHOW',
]);
export const WorkOrderStatus = z.enum([
  'DRAFT', 'SCHEDULED', 'CHECKED_IN', 'IN_PROGRESS',
  'WAITING_FOR_APPROVAL', 'APPROVED', 'WORK_COMPLETED',
  'READY_FOR_PICKUP', 'COMPLETED', 'CANCELLED',
]);
export const EstimateStatus = z.enum(['DRAFT', 'SENT', 'APPROVED', 'REJECTED', 'EXPIRED', 'CANCELLED']);
export const InvoiceStatus = z.enum(['DRAFT', 'OPEN', 'PARTIALLY_PAID', 'PAID', 'VOID', 'UNCOLLECTIBLE']);
export const PaymentStatus = z.enum([
  'CREATED', 'REQUIRES_ACTION', 'PROCESSING',
  'SUCCEEDED', 'FAILED', 'REFUNDED', 'DISPUTED',
]);
export const SubscriptionStatus = z.enum([
  'TRIALING', 'ACTIVE', 'PAST_DUE', 'PAUSED', 'CANCELLED', 'INCOMPLETE',
]);
export const PriceType = z.enum(['FIXED_PRICE', 'STARTING_AT', 'INSPECTION_REQUIRED']);
export const MemberRole = z.enum(['OWNER', 'MANAGER', 'FRONT_DESK', 'TECHNICIAN']);

export type MembershipStatus = z.infer<typeof MembershipStatus>;
export type InvitationStatus = z.infer<typeof InvitationStatus>;
export type ShopStatus = z.infer<typeof ShopStatus>;
export type AppointmentStatus = z.infer<typeof AppointmentStatus>;
export type WorkOrderStatus = z.infer<typeof WorkOrderStatus>;
export type EstimateStatus = z.infer<typeof EstimateStatus>;
export type InvoiceStatus = z.infer<typeof InvoiceStatus>;
export type PaymentStatus = z.infer<typeof PaymentStatus>;
export type SubscriptionStatus = z.infer<typeof SubscriptionStatus>;
export type PriceType = z.infer<typeof PriceType>;
export type MemberRole = z.infer<typeof MemberRole>;
