import { Ride, RideRouting } from './ride';
export class RidesWrapper {
    status: string;
    rides: Ride[];
    
    constructor(obj?) {
        Object.assign(this, ...obj);
    }
}


export interface NextRideResponse {
    status: string;
    ride: Ride;
    routing: RideRouting[];
}


export interface ChangeRideStatusResponse {
    status: string;
    ride: Ride;
    routing: RideRouting[];
}
