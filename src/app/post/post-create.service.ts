import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {Posts} from './posts';

@Injectable({
  providedIn: 'root'
})
export class PostCreateService {

  constructor(private http: HttpClient) { }

  createPost(posts: Posts[]) {
    return this.http.post(`http://34.65.223.230/:9200/users/_doc`, posts).
    pipe(
      catchError( error => {
        return throwError( 'Something went wrong!' );
      })
    );
  }
}
