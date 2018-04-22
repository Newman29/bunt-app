import { Component, OnInit } from '@angular/core';
import { TeamsListService } from '../../shared/services/teams-list.service';

@Component({
  selector: 'bunt-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss']
})
export class TeamsPageComponent implements OnInit {
  teams: any[];

  constructor(private teamsListService: TeamsListService) { }

  ngOnInit() {
    this.teamsListService.getTeams().subscribe(res => {
      this.teams = res;
    });
  }

}
