import { Component, OnInit } from '@angular/core';
import {UserService} from './user.service';
import {Mood} from '../timeline/mood';
import {User} from '../timeline/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  providers: [UserService],
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  moods: Mood[];
  user: User;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    console.log('test');
    this.user = await this.userService.getUserData();
    this.moods = await this.userService.getUserPosts();

  }

}
