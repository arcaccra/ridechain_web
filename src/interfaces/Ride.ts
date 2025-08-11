export interface Ride {
  created_at: string;
  driver: Driver;
  drop_off: number;
  pick_up: number;
  price_per_seat: string;
  seats_available: number;
  updated_at: string;
  uuid: string;
  status?: 'completed' | 'in-progress' | 'cancelled' | 'scheduled' | string;
}
