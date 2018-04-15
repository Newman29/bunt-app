import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'bunt-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit, OnChanges {
  @Input() standingsData: StandingsElement[];
  dataSource = new MatTableDataSource([]);
  displayedColumns = ['rank', 'wins', 'losses', 'pct', 'ties', 'runsScored', 'runsAllowed', 'runDifferential'];

  constructor() { }

  ngOnInit() {}

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.standingsData);
  }
}

export interface StandingsElement {
  'rank': number;
  'wins': number;
  'losses': number;
  'ties': number;
  'runsScored': number;
  'runsAllowed': number;
}
