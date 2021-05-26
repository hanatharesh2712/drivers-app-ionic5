import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-partner-vehicle-dialog',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './partner-vehicle-dialog.component.html',
  styleUrls: ['./partner-vehicle-dialog.component.scss']
})
export class PartnerVehicleDialogComponent implements OnInit {

  vehicleSelected = false;
  constructor() { }

  ngOnInit() {
  }

}
