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
    this.angForm = this.fb.group({
      emoji: ['', Validators.required],
      postText: ['', Validators.required]
    });
  }

  postMood(): void {
    const emoji = this.angForm.get('emoji').value;
    const text = this.angForm.get('postText').value;
    this.postService.postMoods(emoji, text);
    // Call to reset the form values
    this.angForm.get('postText').reset();

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }

    (async () => {
      await delay(300);
      // location.reload();
    })();
  }

}
