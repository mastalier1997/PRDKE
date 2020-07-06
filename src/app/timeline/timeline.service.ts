import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import {catchError, delay, map} from 'rxjs/operators';

import { Mood } from './mood';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';
import {User} from './user';
import {MoodDate} from './moodDate';
import {Timestamp} from './timestamp';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpResponse, HttpServiceClient} from 'mongodb-stitch-browser-services-http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable()
export class TimelineService {
  // tslint:disable-next-line:max-line-length
  allPostsUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getAllPosts';  // URL to web api
  userPostsUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getAllPosts';  // URL to web api

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }

  /** GET Moods from the server */
  getAllMoods(): Observable<Mood[]> {

    return this.http.get<Mood[]>(this.allPostsUrl )
      .pipe(
        catchError(this.handleError('getMoods', []))
      );
  }

  async getMoods(): Promise<Mood[]> {
    // 1. Instantiate an HTTP Service Client
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'getPosts');

    // 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.GET)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getAllPosts')
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
