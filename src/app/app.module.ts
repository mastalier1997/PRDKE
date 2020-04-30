import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { FormsModule } from '@angular/forms';
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
import { PostComponent } from './post/post.component';






const routes: Routes = [

  { path: 'timeline', component: TimelineComponent }           // Add this
];

@NgModule({
  declarations: [
    AppComponent,
    TimelineComponent,
    PostComponent

  ],
  imports: [
    BrowserModule,
    NgbModule,

    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'My-Xsrf-Cookie',
      headerName: 'My-Xsrf-Header',
    }),
    RouterModule,
    BrowserAnimationsModule,
    HammerModule,
    FormsModule,

  ],
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
export class AppRoutingModule { }
