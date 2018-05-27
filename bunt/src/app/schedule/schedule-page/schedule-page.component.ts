import { Component, OnInit, ViewChildren, AfterViewInit } from '@angular/core';
import { ScheduleService } from '../../shared/services/schedule.service';
import * as moment from 'moment-mini-ts';

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

      const currentDate = moment().format('YYYY-MM-DD');
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
    const currentHash = window.location.hash.substr(1);

    // If there's already a current hash specified, respect that and navigate there
    if (currentHash.length) {
      this.jumpToHash(this.scheduleService.currentDisplayDate);
    } else {
      // If there's no hash, fall back to the schedule service's current display date
      if (this.scheduleService.currentDisplayDate) {
        this.jumpToHash(this.scheduleService.currentDisplayDate);
      }
    }

    this.games.changes.subscribe(change => {
      // Re-jump to hash when the collection of games changes
      this.jumpToHash(this.scheduleService.currentDisplayDate);
    });
  }

  jumpToHash(hash: string) {
    // Resetting it and navigating back to the hash forces the view to go to the hash no matter what
    window.location.hash = '';
    this.scheduleService.currentDisplayDate = hash;

    if (hash) {
      location.hash = '#' + hash;
    }
  }

  strip(str: string) {
    return str.replace(/-/g, '');
  }
}
