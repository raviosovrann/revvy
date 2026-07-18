import { z } from 'zod';

export const FieldErrorSchema = z.object({
  field: z.string(),
  message: z.string(),
});

export const ErrorEnvelopeSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    requestId: z.string(),
    fieldErrors: z.array(FieldErrorSchema),
  }),
});

export const PaginationSchema = z.object({
  cursor: z.string().nullable(),
  hasMore: z.boolean(),
});

export const IdempotencyKeySchema = z
  .string()
  .trim()
  .min(8)
  .max(128)
  .regex(
    /^[A-Za-z0-9._:-]+$/,
    'Idempotency key contains unsupported characters.',
  );

export const CreateShopSchema = z
  .object({
    name: z.string().trim().min(1).max(255),
    phone: z.string().trim().min(1).max(32).optional(),
    address: z.string().trim().min(1).max(500),
    timezone: z.string().trim().min(1).max(100),
  })
  .strict();

export const UpdateShopSchema = CreateShopSchema.partial().extend({
  description: z.string().trim().max(2_000).nullable().optional(),
});

export const UpdateProfileSchema = z
  .object({
    displayName: z.string().trim().min(1).max(255).optional(),
    phone: z.string().trim().min(1).max(32).nullable().optional(),
    email: z.string().email().nullable().optional(),
  })
  .strict();

const ServiceFieldsSchema = z.object({
  name: z.string().trim().min(1).max(255),
  description: z.string().trim().max(2_000).optional(),
  category: z.string().trim().max(100).optional(),
  priceType: z.enum(['FIXED_PRICE', 'STARTING_AT', 'INSPECTION_REQUIRED']),
  priceMinor: z.number().int().min(0).optional(),
  startingPriceMinor: z.number().int().min(0).optional(),
  inspectionFeeMinor: z.number().int().min(0).optional(),
  durationMinutes: z
    .number()
    .int()
    .min(1)
    .max(24 * 60),
  currency: z
    .string()
    .trim()
    .length(3)
    .transform((value) => value.toUpperCase())
    .default('USD'),
  taxBehavior: z.enum(['EXCLUSIVE', 'INCLUSIVE']).default('EXCLUSIVE'),
  active: z.boolean().default(false),
  bookingAvailable: z.boolean().default(false),
});

function validateServicePricing(
  service: {
    priceType?: 'FIXED_PRICE' | 'STARTING_AT' | 'INSPECTION_REQUIRED';
    priceMinor?: number;
    startingPriceMinor?: number;
    inspectionFeeMinor?: number;
  },
  context: z.RefinementCtx,
) {
  const requiredField =
    service.priceType === 'FIXED_PRICE'
      ? 'priceMinor'
      : service.priceType === 'STARTING_AT'
        ? 'startingPriceMinor'
        : service.priceType === 'INSPECTION_REQUIRED'
          ? 'inspectionFeeMinor'
          : undefined;

  if (requiredField && service[requiredField] === undefined) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      path: [requiredField],
      message: `${requiredField} is required for ${service.priceType}.`,
    });
  }

  if (service.priceType) {
    const irrelevantFields = [
      'priceMinor',
      'startingPriceMinor',
      'inspectionFeeMinor',
    ].filter(
      (field) =>
        field !== requiredField &&
        service[field as keyof typeof service] !== undefined,
    );
    for (const field of irrelevantFields) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        path: [field],
        message: `${field} is not valid for ${service.priceType}.`,
      });
    }
  }
}

export const CreateServiceSchema = ServiceFieldsSchema.strict().superRefine(
  validateServicePricing,
);

export const UpdateServiceSchema = ServiceFieldsSchema.partial()
  .strict()
  .superRefine(validateServicePricing);

export const CreateAppointmentSchema = z
  .object({
    vehicleId: z.string().uuid(),
    serviceId: z.string().uuid(),
    startsAt: z.string().datetime(),
  })
  .strict();

export const CreateInvitationSchema = z
  .object({
    name: z.string().trim().min(1),
    contactType: z.enum(['PHONE', 'EMAIL']),
    contactValue: z.string().trim().min(1),
    role: z.enum(['MANAGER', 'FRONT_DESK', 'TECHNICIAN']),
  })
  .strict();

export const RecordExternalPaymentSchema = z
  .object({
    amountMinor: z.number().int().positive(),
    method: z.enum([
      'CASH',
      'CARD_TERMINAL',
      'CHECK',
      'BANK_TRANSFER',
      'OTHER',
    ]),
    reference: z.string().trim().min(1).max(255).optional(),
    note: z.string().trim().min(1).max(2_000).optional(),
    paidAt: z.string().datetime(),
  })
  .strict();

export type ErrorEnvelope = z.infer<typeof ErrorEnvelopeSchema>;
export type FieldError = z.infer<typeof FieldErrorSchema>;
export type CreateShopRequest = z.infer<typeof CreateShopSchema>;
export type UpdateShopRequest = z.infer<typeof UpdateShopSchema>;
export type UpdateProfileRequest = z.infer<typeof UpdateProfileSchema>;
export type CreateServiceRequest = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceRequest = z.infer<typeof UpdateServiceSchema>;
export type CreateAppointmentRequest = z.infer<typeof CreateAppointmentSchema>;
export type CreateInvitationRequest = z.infer<typeof CreateInvitationSchema>;
export type RecordExternalPaymentRequest = z.infer<
  typeof RecordExternalPaymentSchema
>;
