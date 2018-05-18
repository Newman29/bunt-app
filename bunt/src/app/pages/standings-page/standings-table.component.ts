import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { Observable } from 'rxjs';
import { DiffPipe } from './diff.pipe';
import { PctPipe } from './pct.pipe';

@Component({
  selector: 'bunt-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit, OnChanges {
  @Input() standingsData: StandingsElement[];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns = ['name', 'rank', 'wins', 'losses', 'pct', 'ties', 'runsScored', 'runsAllowed', 'runDifferential'];

  constructor() {
    const diffPipe = new DiffPipe();
    const pctPipe = new PctPipe();
    // Custom data accessors for sorting
    this.dataSource.sortingDataAccessor = (data: StandingsElement, property: string) => {
      switch (property) {
        case 'name': return data.teamName;
        case 'rank': return +data.rank;
        case 'wins': return +data.wins;
        case 'losses': return +data.losses;
        case 'pct': return +pctPipe.transform(data);
        case 'ties': return +data.ties;
        case 'runsScored': return +data.runsScored;
        case 'runsAllowed': return +data.runsAllowed;
        case 'runDifferential': return +diffPipe.transform(data);
        default: return '';
      }
    };
  }

  ngOnInit() {}
  ngOnChanges() {
    if (this.standingsData) {
      this.dataSource.data = this.standingsData;
      this.dataSource.sort = this.sort;
    }
  }
}

export interface StandingsElement {
  'teamId': number;
  'teamName': string;
  'teamSymbol': string;
  'teamColor': string;
  'rank': number;
  'wins': number;
  'losses': number;
  'ties': number;
  'runsScored': number;
  'runsAllowed': number;
}
