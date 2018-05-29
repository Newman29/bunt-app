import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { ScheduleService } from '../../shared/services/schedule.service';
import * as moment from 'moment-mini-ts';
import 'rxjs/add/operator/map';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bunt-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit, AfterViewInit {
  @ViewChildren('games') games;
  schedule: any[];
  scheduleByDate = {};
  gameDates: any[];

  constructor(
    private scheduleService: ScheduleService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Clear host hash because things can get confusing on this page if it's included
    location.hash = '';
    this.scheduleService.getSchedule().subscribe(schedule => {
      this.schedule = schedule;

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

      // Using locale compare sorts date strings in order
      this.gameDates.sort((a: string, b: string) => {
        const aCmp = this.strip(a);
        const bCmp = this.strip(b);
        return aCmp.localeCompare(bCmp);
      });

      // Using a copy of the reverse ordered gameDates, we can find
      // the next game date (only if we don't already have one)
      if (!this.scheduleService.currentDisplayDate) {
        const currentDate = moment().format('YYYY-MM-DD');
        this.gameDates.slice().reverse().forEach(date => {
          const dateCmp = this.strip(date);
          const currCmp = this.strip(currentDate);

          if (currCmp.localeCompare(dateCmp) <= 0) {
            this.scheduleService.currentDisplayDate = date;
          }
        });
      }
    });
  }

  ngAfterViewInit() {
    // When navigating back to this page, we can immediately jumpToHash after things get rendered
    this.jumpToHash(this.scheduleService.currentDisplayDate);

    // Listen for location hash changes
    this.route.fragment.subscribe(frag => {
      this.jumpToHash(frag);
    });

    // Subscribing here will wait until the dom notes get updated before jumping to the hash
    // Otherwise, they won't exist yet.
    this.games.changes.subscribe(change => {
      if (this.scheduleService.currentDisplayDate) {
        this.jumpToHash(this.scheduleService.currentDisplayDate);
      }
    });
  }

  jumpToHash(hash: string) {
    const element = document.querySelector('#_' + hash);
    if (element) {
      element.scrollIntoView();
    }
  }

  strip(str: string) {
    return str.replace(/-/g, '');
  }
}
