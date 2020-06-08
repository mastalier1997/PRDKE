import { Component, OnInit } from '@angular/core';
import { StitchCredential } from 'mongodb-stitch-core-sdk';
import { Stitch, StitchUser, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  registerUser(email, password, username) {
    const emailPasswordClient = Stitch.defaultAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPasswordClient.registerWithEmail(email, password)
      .then(() => console.log('Successfully sent account confirmation email!'))
      .catch(err => console.error('Error registering new user:', err));
  }

  // TODO - post in DB

}
