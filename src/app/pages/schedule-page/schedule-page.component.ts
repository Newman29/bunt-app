import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../shared/services/schedule.service';
import { TeamsListService } from '../../shared/services/teams-list.service';

@Component({
  selector: 'bunt-schedule-page',
  templateUrl: './schedule-page.component.html',
  styleUrls: ['./schedule-page.component.scss']
})
export class SchedulePageComponent implements OnInit {
  schedule: any[];
  teams: any[];

  constructor(
    private scheduleService: ScheduleService,
    private teamsListService: TeamsListService
  ) { }

  ngOnInit() {
    this.scheduleService.getSchedule().subscribe(res => {
      this.schedule = res;
    });

    this.teamsListService.getTeams().subscribe(res => {
      this.teams = res;
    });
  }
}

export interface ScheduledGameElement {
  id: number;
  datetime: string;
  home: string;
  away: string;
  field: string;
}

export interface TeamElement {
  name: string;
  short: string;
  hex: string;
}
