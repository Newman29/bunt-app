import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ScheduleService } from '../../shared/services/schedule.service';
import 'rxjs/add/operator/map';

@Component({
  selector: 'bunt-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit, OnChanges {
  @Input() teamId: number | string;
  games: any[];
  schedule: any[];

  constructor(
    private scheduleServce: ScheduleService
  ) { }

  ngOnInit() {}

  ngOnChanges(changes) {
    if (this.teamId) {
      this.scheduleServce.getSchedule().map(games => {
        return games.filter(game => {
          return +game.awayId === +this.teamId || +game.homeId === + this.teamId;
        });
      }).subscribe(games => {
        this.games = games;
      });
    }
  }
}
