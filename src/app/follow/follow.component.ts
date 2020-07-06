import { Component, OnInit } from '@angular/core';
import {TimelineService} from '../timeline/timeline.service';
import {FollowService} from './follow.service';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  providers: [FollowService],
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {

  constructor(private followService: FollowService) { }

  ngOnInit(): void {
  }

  follow() {
    const followName = localStorage.getItem('openUser');
    this.followService.putFollows(followName);
  }

}
