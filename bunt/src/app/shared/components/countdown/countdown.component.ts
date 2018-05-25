import { Component, OnInit, Input, OnDestroy, ApplicationRef } from '@angular/core';
import * as moment from 'moment-mini-ts';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'bunt-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit, OnDestroy {
  stable$: Subject<boolean> = new Subject<boolean>();

  @Input() untilDate: string;
  @Input() untilMsg: string;
  @Input() expiredMsg: string;

  days: number;
  hours: number;
  minutes: number;
  seconds: number;

  interval: any;

  expired = false;

  constructor(private applicationRef: ApplicationRef) {}

  ngOnInit() {
    setTimeout(() => {
      this.interval = this.startTimer();
    }, 200);
    // this.applicationRef.isStable.takeUntil(this.stable$)
    //   .subscribe(isStable => {
    //     // Start timer when app becomes stable as a work around to register service workers
    //     if (isStable) {
    //       this.interval = this.startTimer();
    //       this.stable$.next(true);
    //     }
    //   });
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startTimer() {
    const untilTime = moment(this.untilDate).valueOf();

    return setInterval(() => {
      const delta = untilTime - moment().valueOf();

      if (delta < 1000) {
        this.expired = true;
        clearInterval(this.interval);
      }
      // console.log('tick');
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(delta / (1000 * 60 * 60 * 24));
      this.hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      this.minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((delta % (1000 * 60)) / 1000);
    }, 1000);
  }
}
