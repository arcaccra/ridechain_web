export interface Location {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
}

export interface Ride {
  created_at: string;
  driver: import('./Driver').default;
  drop_off: Location;
  pick_up: Location;
  price_per_seat: string;
  seats_available: number;
  updated_at: string;
  uuid: string;
  status?: 'completed' | 'in-progress' | 'cancelled' | 'scheduled' | 'Documents Submitted' | string;
}
