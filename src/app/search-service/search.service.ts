import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../timeline/user';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  getElastic = 'http://34.65.38.205:9200/users/_doc/_search?q=';
  private handleError: HandleError;
  body;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }
  /** GET elasticsearch result */
  getElasticResult( text: string ): Observable<User> {
    this.http.get<User>(this.getElastic + text).subscribe(res => this.body = res);
    console.log(this.bodyText);
    return  this.http.get<User>(this.getElastic + text, {responseType: 'json'});
  }

  get bodyText() {
    return this.body;
  }

}

