import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';

import { Stitch } from 'mongodb-stitch-browser-sdk';
import { HttpServiceClient, HttpRequest, HttpMethod} from 'mongodb-stitch-browser-services-http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

const userID = '5eada3f00952b44e417fcf82';

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  postMoodUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/postPosts/incoming_webhook/postMood';
  postElasticUrl = 'http://34.65.38.205:9200/posts/_doc';


  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }

  /** POST Moods to the server */
  postMoods(emoji, text) {

    /*const body = new HttpParams()
      .set('emoji', emoji)
      .set('text', text)
      .set('userID', userID)
      .set('timestamp', String(Date.now()));

    const req = {
      emoji,
      text,
      userID,
      timeStamp: Date.now(),
    };*/

    const config = new HttpHeaders().set('Content-Type', 'application/json')
      .set('Accept', 'application/json');

    this.http.post<any>(this.postMoodUrl, '{"emoji":"' + emoji + '","text":"' + text + '","userID":"' + userID
      + '"}', httpOptions).subscribe();
    // this.http.post<any>(this.postElasticUrl,  body.toString(), httpOptions).subscribe();
    // this.http.post<any>(this.postElasticUrl, body, httpOptions).subscribe();
    this.http.post<any>(this.postElasticUrl, '{\n' +
      '    "emoji": "' + emoji + '",\n' +
      '    "text": "' + text + '",\n' +
      '    "userID": "' + userID + '",\n' +
      '    "timestamp": "' + Date.now() + '"\n' +
      '  }', httpOptions).subscribe();

  }

  postUserMoods(emoji, text): Promise<any> {
    // 1. Instantiate an HTTP Service Client
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'postPosts');

    const userName = localStorage.getItem('username');
    const userId = localStorage.getItem('userId');


    // 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.POST)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/postPosts/incoming_webhook/postMood')
      .withBody( '{"emoji":"' + emoji + '","text":"' + text + '","userId":"' + userId + '","username":"' + userName + '"}')
      .build();

    // 3. Execute the built request
    return http.execute(request)
      .then(console.log)
      .catch(console.error);
  }
}
