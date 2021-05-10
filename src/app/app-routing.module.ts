

/**
 * Ionic 5 Taxi Booking Complete App (https://store.enappd.com/product/taxi-booking-complete-dashboard)
 *
 * Copyright © 2019-present Enappd. All rights reserved.
 *
 * This source code is licensed as per the terms found in the
 * LICENSE.md file in the root directory of this source tree.
 */


import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('@app/pages/home/home.module').then(m => m.HomePageModule)
  },
  { path: 'payments', loadChildren: () => import('@app/pages/wallet/wallet.module').then(m => m.WalletPageModule) },
  { path: 'rides', loadChildren: () => import('@app/pages/my_rides/my_rides.module').then(m => m.MyRidesPageModule) },
  { path: 'my-reviews', loadChildren: () => import('@app/pages/my_reviews/my_reviews.module').then(m => m.MyReviewsPageModule) },
  { path: 'paymentmethod', loadChildren: () => import('@app/pages/payment-method/payment-method.module').then(m => m.PaymentmethodPageModule) },
  { path: 'profile', loadChildren: () => import('@app/pages/profile/profile.module').then(m => m.ProfilePageModule) },
  { path: 'paymentmethod', loadChildren: () => import('@app/pages/payment-method/payment-method.module').then(m => m.PaymentmethodPageModule) },
  { path: 'carddetail', loadChildren: () => import('@app/pages/card-detail/card-detail.module').then(m => m.CarddetailPageModule) },
  { path: 'invite', loadChildren: () => import('@app/pages/invite/invite.module').then(m => m.InvitePageModule) },
  { path: 'vehiclemanagement', loadChildren: () => import('@app/pages/vehicle-management/vehicle-management.module').then(m => m.VehiclemanagementPageModule) },
  { path: 'addnewvehicle', loadChildren: () => import('@app/pages/add-new-vehicle/add-new-vehicle.module').then(m => m.AddnewvehiclePageModule) },
  { path: 'vehiclemanagement', loadChildren: () => import('@app/pages/vehicle-management/vehicle-management.module').then(m => m.VehiclemanagementPageModule) },
  { path: 'notifications', loadChildren: () => import('@app/pages/notifications/notifications.module').then(m => m.NotificationsPageModule) },
  {
    path: 'customerRequest', loadChildren: () => import('@app/pages/customer-request/customer-request.module').then(m => m.CustomerRequestPageModule)
  },
  { path: 'FAQ', loadChildren: () => import('@app/pages/FAQ/faq.module').then(m => m.FAQPageModule) },
  { path: 'chat', loadChildren: () => import('@app/pages/chat/chat.module').then(m => m.ChatPageModule) },
  { path: 'setting', loadChildren: () => import('@app/pages/setting/setting.module').then(m => m.SettingPageModule) },
  { path: 'documentmanagement', loadChildren: () => import('@app/pages/document-management/document-management.module').then(m => m.DocumentmanagementPageModule) },
  { path: 'drivinglicense', loadChildren: () => import('@app/pages/driving-license/driving-license.module').then(m => m.DrivinglicensePageModule) },
  { path: 'edit-profile', loadChildren: () => import('@app/pages/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule) },
  { path: 'login', loadChildren: () => import('@app/pages/login/login.module').then(m => m.LoginPageModule) },
  { path: 'verify-otp', loadChildren: () => import('@app/pages/verify-otp/verify-otp.module').then(m => m.VerifyOTPPageModule) },
  { path: 'terms-condictions', loadChildren: () => import('@app/pages/terms-conditions/terms-conditions.module').then(m => m.TermsCondictionsPageModule) },
  { path: 'contact', loadChildren: () => import('@app/pages/contact-us/contact-us.module').then(m => m.ContactUSPageModule) },
  { path: 'send-email', loadChildren: () => import('@app/pages/send-email/send-email.module').then(m => m.SendEmailPageModule) },
  { path: 'approved', loadChildren: () => import('@app/pages/approved/approved.module').then(m => m.ApprovedPageModule) },
  { path: 'ride', loadChildren: () => import('@app/pages/ride-detail/ride-detail.module').then(m => m.RideDetailPageModule) },
  {
    path: '**',
    redirectTo: 'home'
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
