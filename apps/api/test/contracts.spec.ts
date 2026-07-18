import {
  CreateServiceSchema,
  RecordExternalPaymentSchema,
} from '@revvy/contracts';

describe('shared API contracts', () => {
  it('enforces the amount required by each service price type', () => {
    const base = { name: 'Brake service', durationMinutes: 60 };
    expect(
      CreateServiceSchema.safeParse({ ...base, priceType: 'FIXED_PRICE' })
        .success,
    ).toBe(false);
    expect(
      CreateServiceSchema.safeParse({
        ...base,
        priceType: 'FIXED_PRICE',
        priceMinor: 7_999,
      }).success,
    ).toBe(true);
    expect(
      CreateServiceSchema.safeParse({
        ...base,
        priceType: 'FIXED_PRICE',
        priceMinor: 7_999,
        startingPriceMinor: 6_999,
      }).success,
    ).toBe(false);
    expect(
      CreateServiceSchema.safeParse({
        ...base,
        priceType: 'INSPECTION_REQUIRED',
        inspectionFeeMinor: 4_900,
      }).success,
    ).toBe(true);
  });

  it('rejects floating-point and non-positive external payment amounts', () => {
    const base = { method: 'CASH', paidAt: '2026-07-18T15:00:00.000Z' };
    expect(
      RecordExternalPaymentSchema.safeParse({ ...base, amountMinor: 50.5 })
        .success,
    ).toBe(false);
    expect(
      RecordExternalPaymentSchema.safeParse({ ...base, amountMinor: 0 })
        .success,
    ).toBe(false);
    expect(
      RecordExternalPaymentSchema.safeParse({ ...base, amountMinor: 5_000 })
        .success,
    ).toBe(true);
  });
});
