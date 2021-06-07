import { Marker } from './../../models/marker';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Location } from '@app/models/location';
import { Subject } from 'rxjs';
declare var google;
import { Ride } from '../../models/ride';
import { MapStyles } from './ride-map-styles';

@Component({
  selector: 'app-ride-map',
  styleUrls: ['ride-map.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ride-map.component.html',
})
export class RideMapComponent implements OnChanges, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @Input() actualRide;
  @Input() showDriverPosition = true;
  @Output() mapLoaded = new EventEmitter<any>();
  map: any;
  autofollow: boolean;
  driverMarker: any;
  currentPosition: Location;
  defLatitude = 39.3902468;
  defLongitude = -91.71869;
  driverPosition: Subject<Location> = new Subject();
  ride: Ride;
  markers = [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({
    suppressMarkers: true,
    preserveViewport: true,
  });
  calculatedRoute: boolean;
  firstTime: boolean = true;
  bounds: any;
  showCenterBtn: any;

  constructor(
  ) {}



  initMap() {
    const mapOptions = {
      mapId: '5ec923e22a6df1ff',
      center: new google.maps.LatLng(this.defLatitude, this.defLongitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    const autofollowFalse = () => {
      this.setAutofollow(false);
    };
    if (this.ride) {
      this.initRideMarkers();
    }

    google.maps.event.addListener(this.map, 'dragstart', autofollowFalse);
    google.maps.event.addListener(this.map, 'drag', () => {
    this.showCenterBtn = !this.bounds.contains(this.map.getCenter());


    });
    if (this.showDriverPosition) {
      this.driverPosition.subscribe((data) => {
        this.updateDriverMarkerPosition(data);
      });
    }
  }



  updateDriverMarkerPosition(currentPos: Location) {
    if (!currentPos) {
      return;
    }
    const latLng = new google.maps.LatLng(currentPos.lat, currentPos.lng);
    if (!this.driverMarker) {
      const icon = {
        url: 'assets/imgs/driver.png',
        anchor: new google.maps.Point(25, 50),
        scaledSize: new google.maps.Size(50, 50),
      };
      this.driverMarker = new google.maps.Marker({
        map: this.map,
        icon: icon,
        position: latLng,
      });
    }
    if (this.firstTime) {
      this.fitBoundsAndCenter();
      this.firstTime = false;
    }
  }

  setAutofollow(state: boolean) {
    this.autofollow = state;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.actualRide && changes.actualRide.currentValue) {
      this.ride = changes.actualRide.currentValue;
      this.initRideMarkers();
    }
  }

  initRideMarkers() {
    if (this.map) {
      this.markers = [];
      this.ride.routing.forEach((route) => {
        if (route.RILat &&  route.RILng)
        {
          this.markers.push(
            new google.maps.Marker({
              map: this.map,
              icon: {
                url: `assets/imgs/${route.RIType.toLowerCase()}.png`,
                anchor: new google.maps.Point(25, 50),
                scaledSize: new google.maps.Size(50, 50),
              },
              position: new google.maps.LatLng(route.RILat, route.RILng),
            })
          );
        }

      });
      this.fitBoundsAndCenter();
      this.setDirections();
    }
  }

  fitBoundsAndCenter() {
    if (this.map) {
      let quantity = 0;
      this.bounds = new google.maps.LatLngBounds();
      this.markers.forEach((marker) => {
        quantity++;
        this.bounds.extend(marker.getPosition());
      });
      if (this.driverMarker) {
        quantity++;
        this.bounds.extend(this.driverMarker.getPosition());
      }
      setTimeout(() => {
        this.map.fitBounds(this.bounds);
        const listener = google.maps.event.addListener(this.map, 'idle', () => {
          if (quantity == 1) {
            this.map.setZoom(12);

            google.maps.event.removeListener(listener);
          }
          this.mapLoaded.emit(true);
        });
      }, 500);
    }
  }

  setDirections() {
    if (this.ride.pickUp && this.ride.dropOff) {
      const wpoints = this.ride.routing.filter(
        (e) => e.RIType != 'DO' && e.RIType != 'PU'
      );
      const request = {
        origin: {
          lat: parseFloat(this.ride.pickUp.RILat),
          lng: parseFloat(this.ride.pickUp.RILng),
        },
        destination: {
          lat: parseFloat(this.ride.dropOff.RILat),
          lng: parseFloat(this.ride.dropOff.RILng),
        },
        waypoints: wpoints.map((wp) => ({
          location: {
            lat: parseFloat(wp.RILat),
            lng: parseFloat(wp.RILng),
          },
          stopover: false,
        })),
        optimizeWaypoints: true,
        travelMode: 'DRIVING',
      };
      //  }
      const directions = this.directionsDisplay;
      this.directionsService.route(request, (result, status: any) => {
        if (status === 'OK') {
          directions.setMap(this.map);
          directions.setDirections(result);
          //  this.onDirectionResponse(result.routes);
          this.calculatedRoute = true;
        }
      });
    }
  }

  centerMap()
  {
    this.fitBoundsAndCenter();
    this.showCenterBtn = false;
  }


  ngAfterViewInit(): void {
    setTimeout(() => this.initMap(), 500);


  }
}
