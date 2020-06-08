import { Injectable } from '@angular/core';
import {HttpServiceClient,  HttpRequest, HttpMethod} from 'mongodb-stitch-browser-services-http';
import {Stitch, UserPasswordCredential} from 'mongodb-stitch-browser-sdk';
import {Observable} from 'rxjs';
import {Mood} from '../timeline/mood';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  getUserData() {

    // 1. Instantiate an HTTP Service Client
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'userService');

    // 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.GET)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData')
      .build();

    // 3. Execute the built request
    http.execute(request)
      .then(console.log)
      .catch(console.error);
  }
}
