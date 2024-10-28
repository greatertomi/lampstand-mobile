export type User = {
  id: string;
  email: string;
  fullName: string;
  phoneNumber?: string | null;
  agreedToTerms?: boolean;
  isEmailVerified?: boolean;
  createdAt?: string;
  profilePicture?: string;
};
