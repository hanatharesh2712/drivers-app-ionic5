import { DocumentsService } from '@app/services/documents.service';

import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { Injectable, NgModule } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from '@app/models/user';


@NgModule({
  imports: [
    RouterModule
  ]
})

export class RouteGuard implements CanActivate {
  loggedInUser: User;

  constructor(private router: Router,
    private storage: Storage,
    private authService: DrvnAuthenticationService,
    private documentsService: DocumentsService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.storage.get('accessInfo').then(response => {
      if (response) {
        // logged in so return true
        this.loggedInUser = this.authService.currentUser;
        if (!this.loggedInUser.partner.skip_registration)
        {
          if (!this.loggedInUser.partner.vehicles || this.loggedInUser.partner.vehicles.length == 0 )
          {
            this.router.navigate(['/register/service-information']);
            return false;
          }
          if (this.documentsService.needDocuments)
          {
            this.router.navigate(['/register/documents']);
            return false;
          }
          if (!this.loggedInUser.partner.payment_method_id)
          {
            this.router.navigate(['/register/agreement']);
            return false;
          }
        }


        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }

    });


  }
}
