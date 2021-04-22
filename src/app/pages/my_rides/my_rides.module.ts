import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRidesPageComponent } from './my_rides.component';
import { IonicModule } from '@ionic/angular';
import { Routes, Router, RouterModule } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: MyRidesPageComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    IonicModule, RouterModule.forChild(routes)
  ],
  declarations: [MyRidesPageComponent]
})
export class MyRidesPageModule { }
