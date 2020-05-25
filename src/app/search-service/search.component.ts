import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {SearchService} from './search.service';
import {User} from '../timeline/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-search-service',
  templateUrl: './search.component.html',
  providers: [SearchService],
  styleUrls: ['./search.component.css']
})

export class SearchServiceComponent implements OnInit {
  user: User;
  angForm2 = this.fb.group({
    searchText: ['', Validators.required]
  });

  ngOnInit() {
    this.getUser();
    this.getObject();
  }

  constructor(private searchservice: SearchService, private fb: FormBuilder) { }

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

}
