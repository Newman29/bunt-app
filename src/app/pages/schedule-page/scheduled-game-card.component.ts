import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ScheduledGameElement } from './schedule-page.component';
import * as moment from 'moment';

@Component({
  selector: 'bunt-scheduled-game-card',
  templateUrl: './scheduled-game-card.component.html',
  styleUrls: ['./scheduled-game-card.component.scss']
})
export class ScheduledGameCardComponent implements OnInit, OnChanges {
  @Input() game: ScheduledGameElement;

  day: string;
  time: string;
  field: string;
  homeTeam: string;
  awayTeam: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const date = moment(this.game.datetime);
    this.day = date.format('ddd, MMM D');
    this.time = date.format('h:mm A');
    this.homeTeam = this.game.home;
    this.awayTeam = this.game.away;
    this.field = this.game.field;
  }
}
