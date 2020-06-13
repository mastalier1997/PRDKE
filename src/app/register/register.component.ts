import { Component, OnInit } from '@angular/core';
import { StitchCredential } from 'mongodb-stitch-core-sdk';
import { Stitch, StitchUser, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../services.authentication';
import {UserService} from '../profile/user.service';
import {AlertService} from '../services.alert';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;


  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private authenticationService: AuthenticationService,
               private userService: UserService,
               private alertService: AlertService) {
        // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/spa']);
    }*/
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;

    this.registerUser(this.f.email.value, this.f.password.value, null);
  }


  registerUser(email, password, username) {

    const stitchAppClient = Stitch.initializeDefaultAppClient('moods-unbhh');

    const emailPasswordClient = stitchAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPasswordClient.registerWithEmail(email, password)
      .then(() => console.log('Successfully sent account confirmation email!'))
      .catch(err => console.error('Error registering new user:', err));

    /*try {
      const stitch = Stitch.initializeDefaultAppClient('moods-unbhh');
      const registerUser = async (email: string, password: string) => {
        return await stitch.auth.emailPassword.registerUser(email, password);
      }
    } catch (e) {
      console.log(e);
    }*/
  }


}
