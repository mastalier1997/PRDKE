import { Component, OnInit } from '@angular/core';
import {TimelineService} from './timeline.service';
import {Mood} from './mood';
import {UserpostsService} from './userposts.service';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  providers: [TimelineService, UserpostsService],
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  moods: Mood[];

  constructor(private timelineService: TimelineService, private userpostsService: UserpostsService) {}

  ngOnInit() {
    this.getMoods(true);
  }

  getMoods(all) {
    if (all) {

      this.timelineService.getMoods().then(result => {console.log(result); } );

      /*(async () => {
        const result = this.timelineService.getMoods();
        if (await result != null) {
          console.log(result);
        }
      })();*/

      /* this.timelineService.getAllMoods()
        .subscribe(moods => (this.moods = moods)); */
    } else {
      this.userpostsService.getUserMoods();
    }

  }
}
