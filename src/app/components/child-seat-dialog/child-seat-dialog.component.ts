
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavParams } from '@ionic/angular';

@Component({
  selector: 'app-child-seat-dialog',
  templateUrl: './child-seat-dialog.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['child-seat-dialog.component.scss']
})
export class ChildSeatDialogComponent implements OnInit {
  child_seats: any;

  constructor(public navParams: NavParams) {
    this.child_seats = this.navParams.get('child_seats');
   }

  ngOnInit() {
  }

}
