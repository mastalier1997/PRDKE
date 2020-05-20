import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from '../timeline/user';
import {Observable} from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class SearchService {

  getElastic = 'http://34.65.38.205:9200/users/_doc/_search?q=username:';

  private handleError: HandleError;

  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');
  }
  /** GET elasticsearch result */
  getElasticResult( text: string ): Observable<User> {
    return this.http.get<User>(this.getElastic + text);
  }
}

