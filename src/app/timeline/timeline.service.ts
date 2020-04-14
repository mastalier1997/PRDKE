import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Mood } from './mood';
import { HttpErrorHandler, HandleError } from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    // 'Authorization': 'my token'
  })
};

@Injectable()
export class TimelineService {
  // tslint:disable-next-line:max-line-length
  moodUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stich-prdke-bykvb/service/http/incoming_webhook/testget';  // URL to web api
  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }

  /** GET Moods from the server */
  getMoods(): Observable<Mood[]> {
    return this.http.get<Mood[]>(this.moodUrl)
      .pipe(
        catchError(this.handleError('getMoods', []))
      );
  }
}
