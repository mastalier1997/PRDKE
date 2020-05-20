import { Component, OnInit } from '@angular/core';
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
  angForm: FormGroup;


  constructor(private searchservice: SearchService, private  fb: FormBuilder) {
    this.createSearchForm();
  }

  createSearchForm() {
    this.angForm = this.fb.group({
      searchText: ['', Validators.required]
    });
  }

  getUser(): void {
    const text = this.angForm.get('searchText').value;
    this.searchservice.getElasticResult(text).subscribe(user => (this.user = user));
  }
}
