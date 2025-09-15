export interface IUser {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
  phone_number: string;
  country?: string;
  current_location?: Record<string, unknown>;
}

// Extended shape for table display needs
export interface IUserTable extends IUser {
  created_at?: string;
  status?: string; // e.g., active | inactive | pending
  role?: string;   // e.g., User | Admin
}
