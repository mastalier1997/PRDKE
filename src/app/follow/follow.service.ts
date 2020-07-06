import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpServiceClient} from 'mongodb-stitch-browser-services-http';
import {User} from '../profile/user';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  user: User[];

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }

  putFollows(follows): Promise<any> {

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData',
      '{"user":"' + localStorage.getItem('username') + '"}', httpOptions).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);

        const flw = this.user[0].follows  + ';' + follows;

        // 1. Instantiate an HTTP Service Client
        const app = Stitch.defaultAppClient;
        const http = app.getServiceClient(HttpServiceClient.factory, 'postPosts');

        const userName = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');


        // 2. Build a new HttpRequest
        const request = new HttpRequest.Builder()
          .withMethod(HttpMethod.POST)
          .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/followService/incoming_webhook/addFolllower')
          .withBody( '{"username":"' + userName + '","follows":"' + flw + '"}')
          .build();

        // 3. Execute the built request
        return http.execute(request)
          .then(console.log)
          .catch(console.error);
      }
    );
    return null;
  }

  deleteFollows(follows): Promise<any> {

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData',
      '{"user":"' + localStorage.getItem('username') + '"}', httpOptions).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);

        const flw = this.user[0].follows;
        let following = '';

        for (let i = 0; i < flw.length; i++) {
          if (flw[i] !== follows) {
            following += flw[i] + ';';
          }
        }


        // 1. Instantiate an HTTP Service Client
        const app = Stitch.defaultAppClient;
        const http = app.getServiceClient(HttpServiceClient.factory, 'postPosts');

        const userName = localStorage.getItem('username');
        const userId = localStorage.getItem('userId');


        // 2. Build a new HttpRequest
        const request = new HttpRequest.Builder()
          .withMethod(HttpMethod.POST)
          .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/followService/incoming_webhook/addFolllower')
          .withBody( '{"username":"' + userName + '","follows":"' + following + '"}')
          .build();

        // 3. Execute the built request
        return http.execute(request)
          .then(console.log)
          .catch(console.error);
      }
    );
    return null;
  }
}
