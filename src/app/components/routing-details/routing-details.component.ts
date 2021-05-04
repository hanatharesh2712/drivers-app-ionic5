import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'routing-details',
  templateUrl: './routing-details.component.html',
  styleUrls: ['./routing-details.component.scss']
})
export class RoutingDetailsComponent implements OnInit {

  @Input() ride;
  @Input() showNotes = false;
  @Input() showStops = true;
  @Input() showStopsCount = false;
  constructor() { }

  ngOnInit() {
    if (this.ride.waitsAndStops)
    {
      this.ride.waitsAndStops.forEach(waypoint => {
        waypoint.readMore = waypoint.RINotes.length < 200;
      });
    }

  }

}
