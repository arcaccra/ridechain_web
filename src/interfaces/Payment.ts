export interface Payment {
  id: string;
  rideId: string;
  driverName: string;
  passengerName: string;
  amount: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}
