import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Mood} from '../timeline/mood';
import {User} from './user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [UserService],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  moods: Mood[];
  user: User[];
  myUser: User[];
  follows: string;

  constructor(private userService: UserService, private http: HttpClient) { }

  async ngOnInit() {

    const user = localStorage.getItem('openUser');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData',
      '{"user":"' + localStorage.getItem('username') + '"}', httpOptions).subscribe(
      (response) => {
        this.myUser = response;
        const flw = this.user[0].follows;

        this.follows = 'false';

        for (let i = 0; i < flw.length; i++){
          if (flw[i] === user) {
            this.follows = 'true';
          }
        }

        localStorage.setItem('isFollowing', this.follows);

      }
    );

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData',
      '{"user":"' + user + '"}', httpOptions).subscribe(
        (response) => {console.log(response); this.user = response; console.log(this.user); }
        );

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getPostsFromUser',
      '{"user":"' + user + '"}', httpOptions).subscribe(
      (response) => {console.log(response); this.moods = response; }
    );


  }

}
