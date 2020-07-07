import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {SearchService} from './search.service';
import {User} from '../timeline/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';
import {Mood} from '../timeline/mood';
import {Router} from '@angular/router';
import {ProfileComponent} from '../profile/profile.component';

@Component({
  selector: 'app-search-service',
  templateUrl: './search.component.html',
  providers: [SearchService],
  styleUrls: ['./search.component.css']
})

export class SearchServiceComponent implements OnInit {
  isDivHidden = false;
  user: User;
  mood: Mood[];
  angForm2 = this.fb.group({
    searchText: ['', Validators.required]
  });

  ngOnInit() {

  }

  constructor(private searchservice: SearchService, private fb: FormBuilder, private router: Router) { }

  getUser() {
    const userName = this.angForm2.value.searchText;
    console.log(this.angForm2.value, userName);
    this.searchservice.getElasticResult(userName).subscribe((data: any) => {
      this.user = data.hits.hits[0]._source;
    });
  }
  getObject() {
    return this.user;
  }

  getMood() {
    const moodText = this.angForm2.value.searchText;
    console.log(this.angForm2.value, moodText);
    this.searchservice.getElasticPostsResult(moodText).subscribe((data2: any) => {
      this.mood = data2.hits.hits;
    });
  }

  changeVisibility() {
    this.isDivHidden = !this.isDivHidden;
  }

  userNull() {
    this.user = null;
  }

  openProfile(user) {
    console.log(user + 'opened');
    localStorage.setItem('openUser', user);
    this.router.navigate(['/profile']);
  }
}
