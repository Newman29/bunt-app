import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment-mini-ts';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'bunt-scheduled-game-card',
  templateUrl: './scheduled-game-card.component.html',
  styleUrls: ['./scheduled-game-card.component.scss']
})
export class ScheduledGameCardComponent implements OnInit, OnChanges {
  @Input() game;
  @Input() displayDate = false;

  day: string;
  time: string;
  field: string;
  home: string;
  homeId: string;
  away: string;
  awayId: string;
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
    this.homeId = this.game.homeId;
    this.away = this.game.away;
    this.awayId = this.game.awayId;
    this.field = this.game.field;
    this.final = this.game.final;
    this.awayScore = this.game.awayScore;
    this.homeScore = this.game.homeScore;
  }
}
