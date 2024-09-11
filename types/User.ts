export type User = {
  id: string;
  emailAddress: string;
  fullName: string;
  phoneNumber?: string | null;
  agreedToTerms?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
};
