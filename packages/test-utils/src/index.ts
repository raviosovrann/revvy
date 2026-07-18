import { v4 as uuidv4 } from 'uuid';

export function createMockUser(overrides?: Partial<MockUser>): MockUser {
  return {
    id: uuidv4(),
    displayName: 'Test User',
    phone: '+15551234567',
    email: 'test@example.com',
    authProviderId: `supabase|${uuidv4()}`,
    ...overrides,
  };
}

export function createMockShop(overrides?: Partial<MockShop>): MockShop {
  return {
    id: uuidv4(),
    name: 'Test Auto Shop',
    phone: '+15559876543',
    timezone: 'America/New_York',
    status: 'PUBLISHED',
    ...overrides,
  };
}

export function createMockMembership(overrides?: Partial<MockMembership>): MockMembership {
  return {
    id: uuidv4(),
    userId: uuidv4(),
    shopId: uuidv4(),
    role: 'OWNER',
    status: 'ACTIVE',
    ...overrides,
  };
}

export function createMockService(overrides?: Partial<MockService>): MockService {
  return {
    id: uuidv4(),
    shopId: uuidv4(),
    name: 'Oil Change',
    priceType: 'FIXED_PRICE',
    priceMinor: 7999,
    durationMinutes: 30,
    active: true,
    ...overrides,
  };
}

export type MockUser = {
  id: string;
  displayName: string;
  phone: string;
  email: string;
  authProviderId: string;
};

export type MockShop = {
  id: string;
  name: string;
  phone: string;
  timezone: string;
  status: string;
};

export type MockMembership = {
  id: string;
  userId: string;
  shopId: string;
  role: string;
  status: string;
};

export type MockService = {
  id: string;
  shopId: string;
  name: string;
  priceType: string;
  priceMinor: number;
  durationMinutes: number;
  active: boolean;
};
