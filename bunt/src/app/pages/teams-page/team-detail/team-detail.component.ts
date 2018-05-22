import { Component, OnInit } from '@angular/core';
import { TeamsListService } from '../../../shared/services/teams-list.service';

@Component({
  selector: 'bunt-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss']
})
export class TeamDetailComponent implements OnInit {

  constructor(private teamsListService: TeamsListService) { }

  ngOnInit() {
  }

}
