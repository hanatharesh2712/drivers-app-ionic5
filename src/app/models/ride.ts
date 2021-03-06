
export class Ride {
  id?: number;
  ride_number?: number;
  pickup_datetime?: string;
  passenger_count?: number;
  luggage_count?: number;
  passenger_first_name?: string;
  passenger_last_name?: string;
  passenger_phone?: string;
  passenger_email?: string;
  ride_status_id?: number;
  child_seats: ChildSeat[];
  is_offer?: boolean;
  is_done?: boolean;
  pu_date?: string;
  pu_time?: string;
  service_type?: string;
  greeting_link: string;
  ride_status?: string;
  ride_id?: number;
  passenger_name?: string;
  passenger_number?: string;
  handicap;
  settled?: string;
  occasion?: string;
  pickup_lat?: string;
  pickup_lng?: string;
  greeting_sign?: boolean;
  greeting_notes?: string;
  pu_location?: string;
  do_location?: string;
  vehicle_type?: string;
  spot_time?: string;
  spot_datetime?: string;
  nice_spot_datetime?: string;
  notes?: string;
  settled_by_driver?: string;
  additional_passengers?: string;
  pickUp: RideRouting;
  dropOff: RideRouting;
  routing: RideRouting[];
  next_status_alert: string;
  next_status_code: string;
  next_status_button_color: string;
  next_status_button_text: string;
  pu_datetime: string;
  nice_pu_datetime: string;
  nice_spot_time: string;
  waitsAndStops = [];
  cost_total;
  settle_deadline: number;
  times: RideTime[];
  canSettle: Boolean;
  costs;
  constructor(obj?) {
      Object.assign(this, ...obj);
  }
}

export interface ChildSeat
{
  type:string;
  count: number;
}

export interface RideTime
{
  id;
  ride_id;
  type_id;
  time;
}


export interface RideRouting
{
  id: number;
  ride_id: number;
  RIType: string;
  LocationType: string;
  RIPosition: number;
  RIPosition2: number;
  RIName: string;
  RIAddr1: string;
  RIAddr2: string;
  RICity: string;
  RIState: string;
  RIZip: string;
  RICountry: string;
  RIPhone: string;
  RINotes: string;
  RIAirlineName: string;
  RIAirlineCode: string;
  RIFlightNumber: string;
  RIEta: string;
  RILng: string;
  RILat: string;
  RITime: string;
  lat: string;
  lng: string;
  formatted_address: string;
}

