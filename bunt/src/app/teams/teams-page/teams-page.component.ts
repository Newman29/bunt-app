import { Component, OnInit, AfterViewInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { TeamsListService } from '../../shared/services/teams-list.service';
import { ObservableMedia } from '@angular/flex-layout';
import { TeamElement } from './team-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'bunt-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss']
})
export class TeamsPageComponent implements OnInit, AfterViewInit {
  teamData: any;
  leagues: any[];
  leagueIds: any = {};

  // Grid Settings
  columnNum = 4;
  rowHeight = '2.5:3.5';
  gutterSize = '8px';


  constructor(
    private teamsListService: TeamsListService,
    private media: ObservableMedia,
    private router: Router
  ) { }

  ngOnInit() {
    // Set initial grid layout
    this.updateGrid();

    this.media.subscribe(change => {
      this.updateGrid();
    });

    this.teamsListService.getTeams().subscribe(res => {
      this.teamData = res;
      this.leagues = Object.keys(this.teamData);
      this.leagues.forEach(league => {
        this.leagueIds[league] = Object.keys(this.teamData[league]);
      });
    });
  }

  ngAfterViewInit() {
    this.updateGrid();
  }

  gotoDetails(id: string | number) {
    this.router.navigateByUrl(`teams/${id}`);
  }

  private updateGrid() {
    if (this.media.isActive('xl')) {
      this.columnNum = 6;
      this.gutterSize = '16px';
    } else if (this.media.isActive('lg')) {
      this.columnNum = 5;
      this.gutterSize = '16px';
    } else if (this.media.isActive('md')) {
      this.columnNum = 4;
      this.gutterSize = '16px';
    } else if (this.media.isActive('sm')) {
      this.columnNum = 3;
      this.gutterSize = '8px';
    } else if (this.media.isActive('xs')) {
      this.columnNum = 2;
      this.gutterSize = '4px';
    }
  }
}
