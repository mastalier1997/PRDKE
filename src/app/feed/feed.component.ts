import { Component, OnInit } from '@angular/core';
import {delay} from 'rxjs/operators';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpServiceClient} from 'mongodb-stitch-browser-services-http';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {TimelineService} from '../timeline/timeline.service';
import {Mood} from '../timeline/mood';
import {User} from '../profile/user';
import {HttpErrorHandler} from '../http-error-handler.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  providers: [TimelineService],
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  moods: Mood[];
  allMoods: Mood[];
  user: User[];

  constructor(private timelineService: TimelineService, private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) { }

  ngOnInit() {
    this.getMoods();
  }

  getMoods() {

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData',
      '{"user":"' + localStorage.getItem('username') + '"}', httpOptions).subscribe(
      (response) => {
        this.user = response;
        console.log(this.user);

        const follows = this.user[0].follows.split(';');


        this.timelineService.getAllMoods()
          .subscribe(moods => {

            this.moods = moods;

            console.log(this.moods);
            const l = this.moods.length;

            for (let i = 0; i < l; i++) {
              console.log(this.moods[i]);
              if (this.moods[i].username !== localStorage.getItem('username')) {

                let flws = false;
                for (let j = 0; j < follows.length; j++) {
                  if (this.moods[i].username === follows[j]) {
                    flws = true;
                  }
                }
                if (!flws) {
                  console.log(this.moods[i] + ' - kick');
                  this.moods.splice(i, 1);
                  i--;
                }
              }
            }
      });
      }
    );
  }

}

