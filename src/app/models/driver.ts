export interface Driver {
  id: number;
  token: string;
  email: string;
  password: string;
  approved: boolean;
  available: boolean;
  location_lat: number;
  location_lng: number;
  dob: string;
  gender: string;
  name: string;
  phone: string;
  profile_img: string;
  car_model: string;
  car_number: string;
}
