import { Component, OnInit } from '@angular/core';
import {TimelineService} from './timeline.service';
import {Mood} from './mood';
import {UserpostsService} from './userposts.service';
import {delay} from 'rxjs/operators';
import {Stitch} from 'mongodb-stitch-browser-sdk';
import {HttpMethod, HttpRequest, HttpServiceClient} from 'mongodb-stitch-browser-services-http';

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
    this.getMoods(false);
  }

  async getMoods(all) {
    if (all) {

      /*const result = this.getMoodsData(); // this.timelineService.getMoods();
      console.log(result);

      /*(async () => {
        const result = this.timelineService.getMoods();
        if (await result != null) {
          console.log(result);
        }
      })();*/

      this.timelineService.getAllMoods()
        .subscribe(moods => (this.moods = moods));
    } else {
      this.moods = await this.timelineService.getMoods();
      // this.userpostsService.getUserMoods();
    }

  }

}
