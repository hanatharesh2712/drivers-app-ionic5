import { Directive, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
declare var google;
@Directive({
  selector: '[google-place]'
})
export class GooglePlacesDirective implements OnInit {
  private element: HTMLInputElement;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  constructor(private elRef: ElementRef) {
    //elRef will get a reference to the element where
    //the directive is placed
    this.element = elRef.nativeElement;
  }

  ngOnInit() {
    setTimeout(() => {
      var nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      const autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox);
      //Event listener to monitor place changes in the input
      google.maps.event.addListener(autocomplete, 'place_changed', () => {
        //Emit the new address object for the updated place
        this.onSelect.emit(this.getFormattedAddress(autocomplete.getPlace()));
      });
    }, 500);

  }


  getFormattedAddress(place) {
    //@params: place - Google Autocomplete place object
    //@returns: location_obj - An address object in human readable format
    let location_obj = {};
    console.log(place);
    location_obj['address_lat'] = place.geometry.location.lat();
    location_obj['address_lng'] = place.geometry.location.lng();
    for (let i in place.address_components) {
      let item = place.address_components[i];

      location_obj['address'] = place.formatted_address;
      if(item['types'].indexOf("locality") > -1) {
        location_obj['address_city'] = item['long_name']
      } else if (item['types'].indexOf("administrative_area_level_1") > -1) {
        location_obj['address_state'] = item['long_name']
      } else if (item['types'].indexOf("street_number") > -1) {
        location_obj['street_number'] = item['short_name']
      } else if (item['types'].indexOf("route") > -1) {
        location_obj['route'] = item['long_name']
      } else if (item['types'].indexOf("country") > -1) {
        location_obj['address_country'] = item['long_name']
      } else if (item['types'].indexOf("postal_code") > -1) {
        location_obj['postal_code'] = item['short_name']
      } else if (item['types'].indexOf("administrative_area_level_2") > -1)
      {
        location_obj['address_county'] = item['long_name']
      }

    }
    return location_obj;
  }

}
