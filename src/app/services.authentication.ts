import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './timeline/user';
import {Stitch, UserPasswordCredential} from 'mongodb-stitch-browser-sdk';
import {RemoteMongoClient} from 'mongodb-stitch';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute} from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    /*if (localStorage.getItem('userMail') != null) {
      this.login(localStorage.getItem('userMail'), localStorage.getItem('userpw'));
    } else {
      return null;
    }*/
    return this.currentUserSubject.value;
  }

  login(email, password) {

    let stitchAppClient = null;

    try {
    stitchAppClient = Stitch.initializeDefaultAppClient('moods-unbhh');
    } catch (e) {
      console.log(e);
      stitchAppClient = Stitch.defaultAppClient;
    }

    return stitchAppClient.auth
      .loginWithCredential(new UserPasswordCredential(email, password))
      .then((user) => {
        // Stitch.defaultAppClient.auth.addAuthListener(user);
        // localStorage.setItem('stitch', JSON.stringify(Stitch.defaultAppClient));
        console.log(`Logged in as user with id: ${user.id}`);
        // localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userId', `${user.id}`); // JSON.stringify(email));
        localStorage.setItem('username', email); // JSON.stringify(email));
        localStorage.setItem('token', `${user.auth.activeUserAuthInfo.accessToken}`);
        localStorage.setItem('userMail', email);
        localStorage.setItem('userpw', password);
        this.router.navigate([this.route.snapshot.queryParams['/spa'] || '/']);

      })
      .catch((reason) => {
        console.log('error');
        // this.router.navigate([this.route.snapshot.queryParams['/login'] || '/']);
        location.reload();
      } );

    /*return this.http.post<any>('https://workoutplanerapi.azurewebsites.net/Token', 'grant_type=password&username=' + email + '&password=' + password, httpOptions)
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));*/
  }

  /*logout() {
    return this.http.post<any>('https://workoutplanerapi.azurewebsites.net/Account/Logout', {})
        // remove user from local storage and set current user to null
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      ;
  }*/
}
