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
    'Authorization': 'token mNW-uEoqoK7mBXjK-gCfui4-qEY9K9Lk8O6-U3l8aXZl9ZRO1TWciY9CzFMHHmr8Nbu2aqPcvazvOGaTttRNu3Wj8dSUa2NBfmBte710hGsyFqt1Grqgp8oC7u2REtL2jl5iwIFpY7JzbvKyMSx3T6tF_stgE-cNhRMQt31lcGr75s2R2-l7p-EFo0iLnc55lUXOdWHwcJCrM9oB-lFZzY8Zln_RVGsKUENa5cAJQHvN06YAwAghS3hxJnRG7vTs79mY2MPJIUqf_Vj2z_ValmuH_7wRDjVAyfG38aPe4kD6LqwGYnDWHUbnXzLufks09QX1VzewqIhS6K7D6kMvZqaXDwFj_hNaoWQJStKhnqGWzmUUrvRtEbmgnlrLexbdVARsJGYDc2nJHA77Hpqu1C2Va_4yQqMmrRp7sU0v-wByu6npFgeRSKPMW1p0-iixWUrVu5x5wb6kJFhuwYStWMYxBBp2vC2hWfmJyL9m6z80s0Y4nH367g2dPeKSscAP'
  })
};
const email = 'lukas.birklbauer@gmail.com';
const pwd = 'Test01!';

@Injectable()
export class TimelineService {
  moodUrl = 'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/stich-prdke-bykvb/service/http/incoming_webhook/testget';  // URL to web api

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
    this.login();
  }

  /** GET Moods from the server */
  getMoods(): Observable<Mood[]> {
    return this.http.get<Mood[]>(this.moodUrl, )
      .pipe(
        catchError(this.handleError('getMoods', []))
      );
  }

  login() {
    return this.http.post<any>('https://workoutplanerapi.azurewebsites.net/Token', { email, pwd });
  }

}
