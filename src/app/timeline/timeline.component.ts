import { Component, OnInit } from '@angular/core';
import {TimelineService} from './timeline.service';
import {Mood} from './mood';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  providers: [TimelineService],
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  moods: Mood[];

  constructor(private timelineService: TimelineService) {}

  ngOnInit() {
    this.getMoods();
  }

  getMoods(): void {
    this.timelineService.getAllMoods()
      .subscribe(moods => (this.moods = moods));
  }
}
