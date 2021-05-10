import { Ride } from './ride';
export class Review {
    id: number;
    ride_id: number;
    driver_id: number;
    ride: Ride;
    rating: number;
    driver_rating: number;
    vehicle_rating: number;
    comments: string;
    created_at: Date;

    constructor(obj?) {
        Object.assign(this, ...obj);
        this.ride = obj ? obj.ride ? new Ride(obj.ride) : null : null;
    }
}

