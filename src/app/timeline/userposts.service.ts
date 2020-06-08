import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';

import { Mood } from './mood';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {User} from './user';
import {MoodDate} from './moodDate';
import {Timestamp} from './timestamp';

import { StitchCredential } from 'mongodb-stitch-core-sdk';
import { Stitch, StitchUser, UserPasswordCredential } from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpServiceClient} from 'mongodb-stitch-browser-services-http';

@Injectable()
export class UserpostsService {
  // tslint:disable-next-line:max-line-length
  allPostsUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getUserPosts';  // URL to web api

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('UserpostService');
  }

  /** GET Moods from the server */
  getAllMoods(): Observable<Mood[]> {

    /* const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.getAuthorization()
      })
    };*/
    return this.http.get<Mood[]>(this.allPostsUrl )
      .pipe(
        catchError(this.handleError('getMoods', []))
      );
  }

  getAuthorization(): string {

    return 'Basic ' + 'Basic bHVrYXMuYmlya2xiYXVlckBnbWFpbC5jb206VGVzdDAxIQ=='; // BSON.Binary.fromText('MyUser:Mypassw0rd').toBase64();
  }

  getUserMoods() {
// 1. Instantiate an HTTP Service Client
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'getPosts');

// 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.GET)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getUserPosts')
      .build();

// 3. Execute the built request
    http.execute(request)
      .then(console.log)
      .catch(console.error);
  }
}
