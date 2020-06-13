import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {AuthenticationService} from './services.authentication';
import {Stitch} from 'mongodb-stitch-browser-sdk';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authenticationService.currentUserValue;
    try {
      const currentUser = Stitch.defaultAppClient;
      return  true;
    } catch (e) {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    /* if (currentUser) {
      // authorised so return true
      return true;
    } */


  }
}
