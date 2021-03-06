import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TimelineComponent } from './timeline/timeline.component';
import {HttpErrorHandler} from './http-error-handler.service';
import {MessageService} from './message.service';
import { Routes, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LyThemeModule, LY_THEME, LY_THEME_NAME, StyleRenderer, LyTheme2 } from '@alyle/ui';
import { MinimaLight } from '@alyle/ui/themes/minima';
import { PostServiceComponent } from './post-service/post-service.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {SearchServiceComponent} from './search-service/search.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import {EmojiModule} from '@ctrl/ngx-emoji-mart/ngx-emoji';
import {ProfileComponent} from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {AppRoutingModule} from './app-routing.module';
import { SpaComponent } from './spa/spa.component';
import { LogoutComponent } from './logout/logout.component';
import { FeedComponent } from './feed/feed.component';
import { FollowComponent } from './follow/follow.component';

/*
const routes: Routes = [
  { path: 'timeline', component: TimelineComponent },
  { path: 'profile', component: ProfileComponent},
  {path: 'home', component: TimelineComponent }
];*/

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    PostServiceComponent,
    SearchServiceComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    SpaComponent,
    LogoutComponent,
    FeedComponent,
    FollowComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,

    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    // RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    HammerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    PickerModule,
    EmojiModule,

  ],
  exports: [ RouterModule ],
  providers: [
    HttpErrorHandler,
    MessageService,
    StyleRenderer,
    LyTheme2,
    { provide: LY_THEME_NAME, useValue: 'minima-light' },
    { provide: LY_THEME, useClass: MinimaLight, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
