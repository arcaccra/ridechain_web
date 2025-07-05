export interface Ride {
  id: string;
  driverName: string;
  passengerName: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  status: 'completed' | 'in-progress' | 'cancelled' | 'scheduled';
  fare: number;
}
