export interface UserRole {
  id: string;
  name: string;
}

export interface UserProfile {
  id: string;
  name: string | null;
  lastName: string | null;
  status: string; // e.g. "NoPhoneNumber" or "Active"
  registerDate: string;
  nationalCode: string | null;
  birthDate: string | null;
  phoneNumber: string;
  email: string | null;
  economicCode: string | null;
  roles: UserRole[];
}