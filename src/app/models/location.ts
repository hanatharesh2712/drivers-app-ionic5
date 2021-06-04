import { Moment } from "moment";

export class Location {
    lat: number;    // (float 10,6)
    lng: number;    // (float 10,6)
    acu: number;    // (float 10,2)
    speed: number;  // (float 10,2)
    alt: number;  // (float 10,2)
    date: Date | Moment;     // (YYYY-MM-DD HH:mm:ss UTC)
    provider: string; // (string: GPS or NETWORK)
    app_version: string; // (string: TBD);
}

