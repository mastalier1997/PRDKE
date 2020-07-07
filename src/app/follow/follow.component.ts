import { Component, OnInit } from '@angular/core';
import {TimelineService} from '../timeline/timeline.service';
import {FollowService} from './follow.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-follow',
  templateUrl: './follow.component.html',
  providers: [FollowService],
  styleUrls: ['./follow.component.css']
})
export class FollowComponent implements OnInit {
  follows: string;

  constructor(private followService: FollowService, private router: Router) { }

  ngOnInit(): void {

    function delay(ms: number) {
      return new Promise( resolve => setTimeout(resolve, ms) );
    }


    (async () => {
      await delay(200);
      // location.reload();
      this.follows = localStorage.getItem('isFollowing');
    })();

  }

  follow() {
    const followName = localStorage.getItem('openUser');
    this.followService.putFollows(followName);

    this.router.navigate(['/home']);
  }

  deletefollow() {
    const followName = localStorage.getItem('openUser');
    this.followService.deleteFollows(followName);

    this.router.navigate(['/home']);

  }

}
