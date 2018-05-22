import { Component, OnInit } from '@angular/core';
import { TeamsListService } from '../../../shared/services/teams-list.service';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'bunt-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  id: string;
  detail: any;
  roster: string[];

  constructor(
    private teamsListService: TeamsListService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.teamsListService.getTeams().switchMap(res => {
      const leagues = Object.keys(res);

      leagues.forEach(league => {
        if (typeof res[league][this.id] !== 'undefined') {
          this.detail = res[league][this.id];
        }
      });

      if (this.detail) {
        return this.teamsListService.getRostersForTeam(this.detail.documentName);
      } else {
        return Observable.of([]);
      }
    }).subscribe(roster => {
      console.log(roster);
      this.roster = roster;
    });
  }

}
