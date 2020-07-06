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

    try {
      const currentUser = Stitch.defaultAppClient;

      if (localStorage.getItem('username') !== null || localStorage.getItem('username') !== '') {
        console.log(localStorage.getItem('username'));
        return true;
      }

      this.authenticationService.login(localStorage.getItem('username'), localStorage.getItem('userpw')).catch((result) => {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      });
    } catch (e) {

        /* this.authenticationService.login(localStorage.getItem('username'), localStorage.getItem('userpw')).catch((result) => {
          // not logged in so redirect to login page with the return url
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
          return false;
        }); */
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

    }
  }
}
