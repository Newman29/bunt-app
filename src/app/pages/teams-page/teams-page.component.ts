import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { TeamsListService } from '../../shared/services/teams-list.service';
import { ObservableMedia } from '@angular/flex-layout';
import { MatGridList } from '@angular/material';
import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
import { TeamElement } from './team-card.component';

@Component({
  selector: 'bunt-teams-page',
  templateUrl: './teams-page.component.html',
  styleUrls: ['./teams-page.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        query(':leave', [
          stagger(100, [
            animate('0.25s', style({ opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ opacity: 0 }),
          stagger(100, [
            animate('0.25s', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class TeamsPageComponent implements OnInit, AfterViewInit {
  @ViewChild('grid')
  private grid: MatGridList;

  teams: TeamElement[];

  constructor(
    private teamsListService: TeamsListService,
    private media: ObservableMedia
  ) { }

  ngOnInit() {
    this.teamsListService.getTeams().subscribe(res => {
      this.teams = res;
    });
  }

  ngAfterViewInit() {
    this.updateGrid();
    this.media.subscribe(change => {
      this.updateGrid();
    });
  }

  private updateGrid() {
    if (this.media.isActive('xl')) {
      this.grid.cols = 6;
      this.grid.gutterSize = '16px';
    } else if (this.media.isActive('lg')) {
      this.grid.cols = 5;
      this.grid.gutterSize = '16px';
    } else if (this.media.isActive('md')) {
      this.grid.cols = 4;
      this.grid.gutterSize = '16px';
    } else if (this.media.isActive('sm')) {
      this.grid.cols = 3;
      this.grid.gutterSize = '8px';
    } else if (this.media.isActive('xs')) {
      this.grid.cols = 2;
      this.grid.gutterSize = '8px';
    }
  }
}
