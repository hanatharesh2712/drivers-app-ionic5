import { DrvnAuthenticationService } from '@app/services/auth/auth.service';
import { Injectable, NgModule } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, RouterModule } from '@angular/router';
import { Storage } from '@ionic/storage';


@NgModule({
  imports: [
    RouterModule
  ]
})

export class RouteGuard implements CanActivate {

  constructor(private router: Router,
    private storage: Storage) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.storage.get('accessInfo').then(response => {
      if (response) {
        // logged in so return true
        return true;
      }
      else {
        this.router.navigate(['/login']);
        return false;
      }

    });


  }
}
