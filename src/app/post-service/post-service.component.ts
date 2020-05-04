import { Component, OnInit } from '@angular/core';
import {PostServiceService} from './post-service.service';

@Component({
  selector: 'app-post-service',
  templateUrl: './post-service.component.html',
  providers: [PostServiceService],
  styleUrls: ['./post-service.component.css']
})
export class PostServiceComponent implements OnInit {

  constructor(private postService: PostServiceService) {}

  ngOnInit(): void {
  }

  postMood(emoji, text): void {
    this.postService.postMoods(emoji, text);
  }

}
