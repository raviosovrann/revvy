import { z } from 'zod';

export const ErrorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string(),
    fieldErrors: z.array(z.object({
      field: z.string(),
      message: z.string(),
    })).optional(),
  }),
});

export const PaginationSchema = z.object({
  cursor: z.string().nullable(),
  hasMore: z.boolean(),
});

export const CreateShopSchema = z.object({
  name: z.string().min(1).max(255),
  phone: z.string().min(1),
  address: z.string().min(1),
  timezone: z.string().min(1),
});

export const CreateServiceSchema = z.object({
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  category: z.string().optional(),
  priceType: z.enum(['FIXED_PRICE', 'STARTING_AT', 'INSPECTION_REQUIRED']),
  priceMinor: z.number().int().min(0).optional(),
  startingPriceMinor: z.number().int().min(0).optional(),
  inspectionFeeMinor: z.number().int().min(0).optional(),
  durationMinutes: z.number().int().min(1),
  currency: z.string().default('USD'),
  active: z.boolean().default(true),
});

export const CreateAppointmentSchema = z.object({
  vehicleId: z.string().uuid(),
  serviceId: z.string().uuid(),
  startsAt: z.string().datetime(),
});

export const CreateInvitationSchema = z.object({
  name: z.string().min(1),
  contactType: z.enum(['PHONE', 'EMAIL']),
  contactValue: z.string().min(1),
  role: z.enum(['MANAGER', 'FRONT_DESK', 'TECHNICIAN']),
});

export type ErrorEnvelope = z.infer<typeof ErrorEnvelopeSchema>;
export type CreateShopRequest = z.infer<typeof CreateShopSchema>;
export type CreateServiceRequest = z.infer<typeof CreateServiceSchema>;
export type CreateAppointmentRequest = z.infer<typeof CreateAppointmentSchema>;
export type CreateInvitationRequest = z.infer<typeof CreateInvitationSchema>;
