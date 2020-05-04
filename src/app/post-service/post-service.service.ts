import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {

  postMoodUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/postPosts/incoming_webhook/postMood';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }

  /** POST Moods to the server */
  postMoods(emoji, text) {

    this.http.post<any>(this.postMoodUrl, '{"emoji":"' + emoji + '","text":"' + text + '"}', httpOptions).subscribe();
  }
}
