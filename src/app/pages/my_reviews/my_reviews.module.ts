import { RouteGuard } from './../../services/util/route.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Routes, RouterModule } from '@angular/router';
import { MyReviewsPage } from './my_reviews.component';
import { PipesModule } from '@app/pipes/pipes/pipes.module';
const routes: Routes = [
  {
    path: '',
    component: MyReviewsPage,
    canActivate: [RouteGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    IonicModule, RouterModule.forChild(routes)
  ],
  declarations: [MyReviewsPage]
})
export class MyReviewsPageModule { }
