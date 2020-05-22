import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {SearchService} from './search.service';
import {User} from '../timeline/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-search-service',
  templateUrl: './search.component.html',
  providers: [SearchService],
  styleUrls: ['./search.component.css']
})

export class SearchServiceComponent {
  user: User;
  angForm2 = this.fb.group({
    searchText: ['', Validators.required]
  });

  constructor(private searchservice: SearchService, private fb: FormBuilder) { }

  getUser() {
    const userName = this.angForm2.value.searchText;
    console.log(this.angForm2.value, userName);
    this.searchservice.getElasticResult(userName).subscribe(user => (this.user = user))
  }


}
