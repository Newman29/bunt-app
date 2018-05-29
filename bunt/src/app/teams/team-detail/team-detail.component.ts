import { Component, OnInit } from '@angular/core';
import { TeamsListService } from '../../shared/services/teams-list.service';
import { ActivatedRoute, NavigationEnd } from '@angular/router';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/skip';
import { StandingsService } from '../../shared/services/standings.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';

@Component({
  selector: 'bunt-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {
  id: string;
  detail: any;
  roster: string[];
  teamRecord: any;
  teams: any[];

  constructor(
    private teamsListService: TeamsListService,
    private standingsService: StandingsService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.render(this.id);

    // Re-render this component when parameters change
    // We're skipping the first one because we took care of that one already in initialization
    this.route.params.skip(1).subscribe(params => {
      this.id = params.id;
      this.render(params.id);
      this.snackbar.open(`Switching to ${this.teams[this.id].name}`, '', {
        duration: 750,
        verticalPosition: 'top'
      });
    });
  }

  render(id) {
    this.retreiveTeamDetails(id);
    this.retreiveTeamRecord(id);
  }

  private retreiveTeamRecord(id) {
    this.standingsService.getStandings().subscribe(standings => {
      this.teamRecord = standings.filter(rec => +rec.id === +id)[0];
    });
  }

  private retreiveTeamDetails(id) {
    this.teamsListService.getTeams().switchMap(res => {
      const keys = Object.keys(res);

      // Flatten one layer deep to get a dictionary of all teams
      this.teams = keys.reduce((acc, key) => {
        return {...acc, ...res[key]};
      }, {});

      this.detail = this.teams[id];

      if (this.detail) {
        return this.teamsListService.getRostersForTeam(this.detail.documentName);
      } else {
        return Observable.of([]);
      }
    }).subscribe(roster => {
      this.roster = roster;
    });
  }
}
