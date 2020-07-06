import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {User} from '../timeline/user';
import {Observable} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Mood} from '../timeline/mood';

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
  getElasticPosts = 'http://34.65.38.205:9200/posts/_doc/_search?q=text:';

  private handleError: HandleError;
  body;
  body2;

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

  getElasticPostsResult( text: string ): Observable<Mood[]> {
    this.http.get<Mood[]>(this.getElasticPosts + text).subscribe(res => this.body2 = res);
    console.log(this.bodyText2);
    return  this.http.get<Mood[]>(this.getElasticPosts + text, {responseType: 'json'}).pipe(
      catchError(this.handleError('getMood', []))
    );
  }

  get bodyText() {
    return this.body;
  }
  get bodyText2() {
    return this.body2;
  }


}

