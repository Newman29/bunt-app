import { Component, OnInit, Input, OnChanges } from '@angular/core';
import * as moment from 'moment';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'bunt-scheduled-game-card',
  templateUrl: './scheduled-game-card.component.html',
  styleUrls: ['./scheduled-game-card.component.scss']
})
export class ScheduledGameCardComponent implements OnInit, OnChanges {
  @Input() game;

  day: string;
  time: string;
  field: string;
  home: string;
  away: string;
  final: boolean;
  awayScore: number;
  homeScore: number;

  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    const date = moment(this.game.datetime);
    this.day = date.format('ddd, MMM D');
    this.time = date.format('h:mm A');
    this.home = this.game.home;
    this.away = this.game.away;
    this.field = this.game.field;
    this.final = this.game.final;
    this.awayScore = this.game.awayScore;
    this.homeScore = this.game.homeScore;
  }
}
