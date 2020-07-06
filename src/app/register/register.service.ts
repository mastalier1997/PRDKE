import { Injectable } from '@angular/core';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpServiceClient} from 'mongodb-stitch-browser-services-http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor() { }

  async register(username, password, surname, firstname) {
    const app = Stitch.defaultAppClient;
    const http = app.getServiceClient(HttpServiceClient.factory, 'registrationService');

    // 2. Build a new HttpRequest
    const request = new HttpRequest.Builder()
      .withMethod(HttpMethod.POST)
      .withUrl('https://webhooks.mongodb-stitch.com/api/client/v2.0/app/moods-unbhh/service/registrationService/incoming_webhook/registerUser')
      .withBody( '{"username":"' + username + '","password":"' + '****' + '", "surname":"' + surname + '","firstname":"' + firstname + '"}')
      .build();

    // 3. Execute the built request
    await http.execute(request)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch(console.error);
    return null;
  }
}
