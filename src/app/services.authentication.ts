import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from './timeline/user';
import {Stitch, UserPasswordCredential} from 'mongodb-stitch-browser-sdk';
import {RemoteMongoClient} from 'mongodb-stitch';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(email, password) {

    const stitchAppClient = Stitch.initializeDefaultAppClient('moods-unbhh');

    return stitchAppClient.auth
      .loginWithCredential(new UserPasswordCredential(email, password))
      .then((user) => {
        console.log(`Logged in as user with id: ${user.id}`);
        localStorage.setItem('currentUserMail', JSON.stringify(email));
        /* const mongoClient = stitchAppClient.getServiceClient(
          RemoteMongoClient.factory,
          'mongodb-atlas'
        );
        const items = mongoClient.db("todo").collection("items");*/

        return email;
      })
      .catch(console.error);

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
