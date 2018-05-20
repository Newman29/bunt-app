import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ScheduledGameElement } from './schedule-page.component';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material';

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
  home: string;
  away: string;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const date = moment(this.game.datetime);
    this.day = date.format('ddd, MMM D');
    this.time = date.format('h:mm A');
    this.home = this.game.home;
    this.away = this.game.away;
    this.field = this.game.field;
  }
}
