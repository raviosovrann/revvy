export type AuthenticatedUser = {
  userId: string;
  authProviderId: string;
  email?: string;
  phone?: string;
};
