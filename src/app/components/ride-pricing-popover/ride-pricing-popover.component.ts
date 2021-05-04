import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ride-pricing-popover',
  templateUrl: './ride-pricing-popover.component.html',
  styleUrls: ['./ride-pricing-popover.component.css']
})
export class RidePricingPopoverComponent implements OnInit {

  costs: any[] = [];
  constructor() { }

  ngOnInit() {
  }

}
