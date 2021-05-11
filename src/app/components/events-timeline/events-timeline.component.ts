import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'events-timeline',
  templateUrl: './events-timeline.component.html',
  styleUrls: ['./events-timeline.component.scss']
})
export class EventsTimeLineComponent implements OnInit {


  @Input() ride;
  constructor() { }

  ngOnInit() {
    this.ride.times =this.ride.times.sort(function(a,b){ return new Date(a.time).getTime() - new Date(b.time).getTime();})
    this.ride.times.splice(this.ride.times.findIndex(e => e.type_id == 5));

  }

}
