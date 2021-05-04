import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyRidesPageComponent } from './my_rides.component';
import { IonicModule } from '@ionic/angular';
import { Routes, Router, RouterModule } from '@angular/router';
import { RouteGuard } from '@app/services/util/route.guard';
import { PipesModule } from '@app/pipes/pipes/pipes.module';
import { RidesListComponent } from './rides_list/rides_list.component';
import { RoutingDetailsModule } from '@app/components/routing-details/routing-details.module';
const routes: Routes = [
  {
    path: '',
    component: MyRidesPageComponent,
    canActivate: [RouteGuard],
    children: [
      {
        path: 'offers',
        children: [
          {
            path: '',
            component: RidesListComponent,
            data: {
              type: 'offers'
            }
          }
        ]
      },
      {
        path: 'done',
        children: [
          {
            path: '',
            component: RidesListComponent,
            data: {
              type: 'done',
            }

          }
        ]
      },
      {
        path: 'accepted',
        children: [
          {
            path: '',
            component: RidesListComponent,
            data: {
              type: 'accepted'
            }
          }
        ]
      },

    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    RoutingDetailsModule,
    IonicModule, RouterModule.forChild(routes)
  ],
  declarations: [MyRidesPageComponent, RidesListComponent]
})
export class MyRidesPageModule { }
