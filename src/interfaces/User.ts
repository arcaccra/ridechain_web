// user payload

/** {
  "id": 16,
    "avatar": null,
    "full_name": "Awura Asamoa",
    "email": "awura@arcaccra.org",
    "country": "GH",
    "current_location": [
  0.0,
  0.0
],
    "phone_number": "+233595233647"
},
**/

export interface ILocation {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    created_at?: string;
}

export interface IPassenger {
    id: number;
    user: IUser;
    pickup_location: ILocation;
    dropoff_location: ILocation;
    status: string;
    created_at: string;
}

export interface IDriver {
    id: number;
    user: IUser;
    vehicle_plate_number: string;
    vehicle_type: string;
    vehicle_color: string;
    vehicle_image?: string;
    license_number?: string;
    status: string;
    id_type?: string;
    id_number?: string;
    id_image?: string;
}

export interface IRide {
    uuid: string;
    driver: IDriver;
    pick_up: ILocation;
    drop_off: ILocation;
    seats_available: number;
    price_per_seat: string;
    departure_time?: string;
    status: string;
    passengers: IPassenger[];
    created_at: string;
}

export interface IUser {
  id: number;
  full_name: string;
  email: string;
  avatar: string;
  phone_number: string;
  country: string;
  //formatted location
  current_location?: [number, number] | null;
  is_active?: boolean;
  driver?: IDriver;
  user_rides?: IRide[];
}

// Extended shape for table display needs
export interface IUserTable extends Omit<IUser, 'current_location'> {
  current_location?: string; // Override for table display
  created_at?: string;
  status?: string; // e.g., active | inactive | pending
  role?: string;   // e.g., User | Admin
}
