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

  constructor(private userService: UserService, private http: HttpClient) { }

  async ngOnInit() {
    // this.user = await this.userService.getUserData();

    const user = localStorage.getItem('openUser');

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'/*,
        "Authorization": this.getAuthorizationToken()*/
      })
    };

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/userService/incoming_webhook/getUserData',
      '{"user":"' + user + '"}', httpOptions).subscribe(
        (response) => {console.log(response); this.user = response; console.log(this.user); }
        );

    this.http.post<any>('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/getPosts/incoming_webhook/getPostsFromUser',
      '{"user":"' + user + '"}', httpOptions).subscribe(
      (response) => {console.log(response); this.moods = response; }
    );


    // this.moods = await this.userService.getUserPosts();

  }

}
