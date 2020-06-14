import { Injectable } from '@angular/core';
import {HttpServiceClient,  HttpRequest, HttpMethod} from 'mongodb-stitch-browser-services-http';
import {Stitch, UserPasswordCredential} from 'mongodb-stitch-browser-sdk';
import {Observable} from 'rxjs';
import {Mood} from '../timeline/mood';
import {User} from '../timeline/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  async getUserData(): Promise<User> {

    // 1. Instantiate an HTTP Service Client
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'userService');

    // 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.GET)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData')
      .build();

    // 3. Execute the built request
    await http.execute(request).then((result) => {
      const obj: User = JSON.parse(result.body.toString());
      console.log(obj);
      return obj;
    }).catch(console.error);

    return null;
  }

  async getUserPosts(): Promise<Mood[]> {

    // 1. Instantiate an HTTP Service Client
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'getPosts');

    // 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.GET)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getUserPosts')
      .build();

    // 3. Execute the built request
    await http.execute(request).then((result) => {
      const obj: Mood[] = JSON.parse(result.body.toString());
      console.log(obj);
      return obj;
    }).catch(console.error);


    return null;
  }
}
