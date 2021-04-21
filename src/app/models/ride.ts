export interface Ride{
  id: number;
  origin_lat: number;
  origin_lng: number;
  destination_lat: number;
  destination_lng: number;
  distance: number;
  fare: number;
  clientId: number;
  driverId: number;
  driver_rejected: boolean;
  ride_started: boolean;
  ride_accepted: boolean;
  user_rejected: boolean;
  ride_completed: boolean;
  taxi_type: string;
}
