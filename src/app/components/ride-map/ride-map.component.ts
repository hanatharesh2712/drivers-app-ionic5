
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Location } from '@app/models/location';
import { GeolocationService } from '@app/services/geolocation.service';
declare var google;
import { Ride } from '../../models/ride';


@Component({
  selector: 'app-ride-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ride-map.component.html'
})
export class RideMapComponent implements OnInit, OnChanges {
  @ViewChild('map', {static: true}) mapElement: ElementRef;
  @Input() actualRide;
  map: any;
  autofollow: any;
  driverMarker: any;
  currentPos: Location;
  defLatitude = 39.3902468;
  defLongitude = -91.71869;
  ride: Ride;
  markers = [];
  directionsService = new google.maps.DirectionsService();
  directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true, preserveViewport: true });
  calculatedRoute: boolean;
  constructor(private geolocationService: GeolocationService) { }

  ngOnInit() {
    this.initMap();
  }

  initMap() {
    let mapOptions = {
      center: new google.maps.LatLng(this.defLatitude, this.defLongitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true,
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let autofollowFalse = () => {
      this.setAutofollow(false);
    };
    google.maps.event.addListener(this.map, 'dragstart', autofollowFalse);

    this.geolocationService.driverPosition.subscribe(data => {
      this.updateDriverMarkerPosition(data);
    });
  }


  updateDriverMarkerPosition(currentPos: Location) {
    let latLng = new google.maps.LatLng(currentPos.lat, currentPos.lng);
    if (!this.driverMarker) {
      let icon = {
        url: "assets/imgs/driver.png",
        anchor: new google.maps.Point(25, 50),
        scaledSize: new google.maps.Size(50, 50)
      }
      this.driverMarker = new google.maps.Marker({
        map: this.map,
        icon: icon,
        position: latLng
      });
    }
    if (this.autofollow) {
      this.map.setCenter(latLng);
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
    this.ride.routing.forEach(route => {
      this.markers.push(new google.maps.Marker({
        map: this.map,
        icon: {
          url: `assets/imgs/${route.RIType.toLowerCase()}.png`,
          anchor: new google.maps.Point(25, 50),
          scaledSize: new google.maps.Size(50, 50)
        },
        position: new google.maps.LatLng(route.RILat, route.RILng)
      }));

    });
    this.fitBoundsAndCenter();
    this.setDirections();


  }


  fitBoundsAndCenter() {
    let bounds = new google.maps.LatLngBounds();
    this.markers.forEach(marker => {
      bounds.extend(marker.getPosition());
    })
    this.map.fitBounds(bounds);
  }

  setDirections() {
    let wpoints = this.ride.routing.filter(e => e.RIType != 'DO' && e.RIType != 'PU');
    let request = {
      origin: {
        lat: parseFloat(this.ride.pickUp.RILat),
        lng: parseFloat(this.ride.pickUp.RILng)
      },
      destination: {
        lat: parseFloat(this.ride.dropOff.RILat),
        lng: parseFloat(this.ride.dropOff.RILng)
      },
      waypoints: wpoints.map(wp =>
      ({
        location: {
          lat: parseFloat(wp.RILat),
          lng: parseFloat(wp.RILng)
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
