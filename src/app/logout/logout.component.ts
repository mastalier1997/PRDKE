import { Component, OnInit } from '@angular/core';
import {Stitch} from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  logout() {
    try {
      localStorage.clear();
      const stitch = Stitch.defaultAppClient;
      stitch.auth.logout();
    } catch (e) {
      console.log(e);
    }
  }

}
