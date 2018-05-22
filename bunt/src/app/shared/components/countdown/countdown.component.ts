import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'bunt-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() untilDate: string;
  @Input() untilMsg: string;
  @Input() expiredMsg: string;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  intervalId: number;

  expired = false;

  constructor() {}

  ngOnInit() {
    // const untilTime = new Date(this.untilDate).getTime();
    const untilTime = moment(this.untilDate).valueOf();

    this.intervalId = setInterval(() => {
      const delta = untilTime - moment().valueOf();

      if (delta < 1000) {
        this.expired = true;
        clearInterval(this.intervalId);
      }

      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(delta / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((delta % (1000 * 60)) / 1000);
    });
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

}
