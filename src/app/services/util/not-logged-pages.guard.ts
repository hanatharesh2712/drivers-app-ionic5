import { DocumentsService } from '@app/services/documents.service';

import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { Injectable, NgModule } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage';
import { User } from '@app/models/user';
import { zip } from 'rxjs';


@NgModule({
  imports: [
    RouterModule
  ]
})

export class NotLoggedPagesGuard implements CanActivate {
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
            return true;
          }
          if (this.documentsService.needDocuments)
          {
            return true;
          }
          if (!this.loggedInUser.partner.payment_method_id)
          {
            return true;
          }
        }

        this.router.navigate(['/home']);
        return false;
      }
      else {

        return true;
      }

    }, error =>
    {
      return true;
    });


  }
}
