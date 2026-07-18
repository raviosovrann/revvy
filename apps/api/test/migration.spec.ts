import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

describe('initial migration', () => {
  it('contains the identity, tenant, idempotency, and payment foundations', () => {
    const migration = readFileSync(
      resolve(
        __dirname,
        '../../../prisma/migrations/20260718000100_initial_foundation/migration.sql',
      ),
      'utf8',
    );
    expect(migration).toContain('CREATE TABLE "users"');
    expect(migration).toContain('CREATE TABLE "shops"');
    expect(migration).toContain('CREATE TABLE "memberships"');
    expect(migration).toContain('shops_creationIdempotencyKey_key');
    expect(migration).toContain('payments_idempotencyKey_key');
  });
});
