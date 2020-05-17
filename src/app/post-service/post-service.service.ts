import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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
  postElasticUrl = 'http://34.65.173.197:9200/post/_doc';


  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }

  /** POST Moods to the server */
  postMoods(emoji, text) {

    this.http.post<any>(this.postMoodUrl, '{"emoji":"' + emoji + '","text":"' + text + '","userID":"' + userID
      + '"}', httpOptions).subscribe();
    this.http.post<any>(this.postElasticUrl, '{"emoji":"' + emoji + '","text":"' + text + '","userID":"' + userID
      + '","timestamp":"' + Date.now() + '" }', httpOptions).subscribe();
  }
}
