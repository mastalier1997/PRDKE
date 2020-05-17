import { Component, OnInit } from '@angular/core';
import {PostServiceService} from './post-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-post-service',
  templateUrl: './post-service.component.html',
  providers: [PostServiceService],
  styleUrls: ['./post-service.component.css']
})
export class PostServiceComponent implements OnInit {
  angForm: FormGroup;

  constructor(private postService: PostServiceService, private  fb: FormBuilder) {this.createForm(); }

  ngOnInit(): void {
  }

  createForm() {
    this.angForm = this.fb.group({postText: ['', Validators.required]});
  }

  postMood(emoji, text): void {
    this.postService.postMoods(emoji, text);
  }

}
