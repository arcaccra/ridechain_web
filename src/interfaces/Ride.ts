// Interfaces aligned with backend ride payload and current UI consumption

export interface User {
  id?: number | string;
  full_name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
}

export interface Driver {
  id: number;
  user?: User;
  id_type?: string;
  id_number?: string;
  vehicle_plate_number?: string;
  vehicle_type?: string;
  vehicle_color?: string;
  date_created?: string; // ISO string
  date_updated?: string; // ISO string
  status?: string;
  online?: boolean;
}

export interface LocationPoint {
  id: number;
  name?: string;
  latitude?: number;
  longitude?: number;
}

export interface Ride {
  uuid: string;
  driver?: Driver;
  pick_up?: LocationPoint;
  drop_off?: LocationPoint;
  seats_available?: number;
  price_per_seat: string; // currency string (e.g., "12.50")
  created_at?: string; // ISO string
  updated_at?: string; // ISO string
  status?: string; // e.g., completed | in-progress | cancelled | scheduled
}
