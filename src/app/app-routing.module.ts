import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {TimelineComponent} from './timeline/timeline.component';
import {AuthGuard} from './auth.guard';
import {ProfileComponent} from './profile/profile.component';
import {SpaComponent} from './spa/spa.component';
import {FeedComponent} from './feed/feed.component';

const routes: Routes = [
  { path: '', component: SpaComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'timeline', component: SpaComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  { path: 'feed', component: FeedComponent, canActivate: [AuthGuard]},
  {path: 'home', component: SpaComponent },

  // otherwise redirect to login
  { path: '*', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
