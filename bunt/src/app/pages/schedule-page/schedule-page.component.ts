import { Component, OnInit, HostListener } from '@angular/core';
import { ScheduleService } from '../../shared/services/schedule.service';
import { TeamsListService } from '../../shared/services/teams-list.service';
import * as moment from 'moment';

@Component({
  selector: 'bunt-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {
  schedule: any[];
  scheduleByDate = {};
  gameDates: any[];

  constructor(
    private scheduleService: ScheduleService
  ) { }

  ngOnInit() {
    this.scheduleService.getSchedule().subscribe(res => {
      this.schedule = res;

      // Group by games on the schedule by date
      this.scheduleByDate = this.schedule.reduce((games, game) => {
        // The date is the key we're going to group by
        const key = moment(game.datetime).startOf('day').format('YYYY-MM-DD');

        if (Array.isArray(games[key])) {
          games[key].push(game);
        } else {
          games[key] = new Array(game);
        }

        return games;
      }, {});

      this.gameDates = Object.keys(this.scheduleByDate);
    });
  }

  @HostListener('window:hashchange')
  onHashChange() {
    // 56px is the height of the toolbar
    // 8px is a sensible padding
    window.scrollTo(window.scrollX, window.scrollY - 56 - 8);
  }
}

export interface ScheduledGameElement {
  id: number;
  datetime: string;
  home: string;
  away: string;
  field: string;
}
