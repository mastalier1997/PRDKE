import { Component, OnInit } from '@angular/core';
import { StitchCredential } from 'mongodb-stitch-core-sdk';
import { Stitch, StitchUser, UserPasswordCredential, UserPasswordAuthProviderClient } from 'mongodb-stitch-browser-sdk';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../services.authentication';
import {UserService} from '../profile/user.service';
import {AlertService} from '../services.alert';
import {RegisterService} from './register.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../http-error-handler.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  providers: [RegisterService],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  postElasticUrl = 'http://34.65.38.205:9200/users/_doc';


  private handleError: HandleError;

  constructor( private formBuilder: FormBuilder,
               private router: Router,
               private authenticationService: AuthenticationService,
               private userService: UserService,
               private alertService: AlertService,
               private route: ActivatedRoute,
               private registerService: RegisterService,
               private http: HttpClient,
               httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('TimelineService');

    // redirect to home if already logged in
        /*if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/spa']);
    }*/
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
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

    this.registerUser(this.f.username.value, this.f.password.value, null);
  }


  async registerUser(email, password, username) {
    this.postElasticUrl = 'http://34.65.38.205:9200/users/_doc';

    let stitchAppClient;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    try {
      stitchAppClient = Stitch.initializeDefaultAppClient('moods-unbhh');
    } catch (e) {
      console.log(e);
      stitchAppClient = Stitch.defaultAppClient;
    }
// Vorname & Nachname fehlt noch


    const emailPasswordClient = stitchAppClient.auth
      .getProviderClient(UserPasswordAuthProviderClient.factory);

    emailPasswordClient.registerWithEmail(email, password)
      .then(() => {
        console.log('Successfully sent account confirmation email!');
        // this.registerService.register(email, password);
        this.http.post<any>(this.postElasticUrl, '{\n' +
          '    "firstName": "' + 'null' + '",\n' +
          '    "lastName": "' + 'null' + '",\n' +
          '    "username": "' + email + '",\n' +
          '    "password": "' + password + '"\n' +
          '  }', httpOptions).subscribe();
        this.router.navigate([this.route.snapshot.queryParams['/login'] || '/']);
      })
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
