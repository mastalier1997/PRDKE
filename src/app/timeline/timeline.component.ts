import { Component, OnInit } from '@angular/core';
import {TimelineService} from './timeline.service';
import {Mood} from './mood';
import {UserpostsService} from './userposts.service';
import {delay} from 'rxjs/operators';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpServiceClient} from 'mongodb-stitch-browser-services-http';
import {HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  providers: [TimelineService, UserpostsService],
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  moods: Mood[];
  options: Record<string, string[]>;

  constructor(private timelineService: TimelineService) {}

  ngOnInit() {
    this.getMoods();
  }

  async getMoods() {

    this.timelineService.getAllMoods()
      .subscribe(moods => { console.log(moods); this.moods = moods; });

  }

}
