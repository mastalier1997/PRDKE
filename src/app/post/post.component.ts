import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {PostCreateService} from './post-create.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  posts: any = {};

  constructor(private http: HttpClient, private createpost: PostCreateService) {}

  create_Post() {
    this.createpost.createPost(this.posts).subscribe((res) => {
    });
  }


  ngOnInit(): void {
  }

}
