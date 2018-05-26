import { Component, OnInit, OnChanges, Input, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatSortable } from '@angular/material';
import { Observable } from 'rxjs';
import { StandingsRecord } from '../../shared/services/standings.service';

@Component({
  selector: 'bunt-standings-table',
  templateUrl: './standings-table.component.html',
  styleUrls: ['./standings-table.component.scss']
})
export class StandingsTableComponent implements OnInit, OnChanges {
  @Input() standingsData: StandingsRecord[];
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource();
  displayedColumns = ['name', 'rank', 'wins', 'losses', 'ties', 'pct', 'runsScored', 'runsAllowed', 'runDifferential'];

  constructor() {}

  ngOnInit() {
    // Custom data accessors for sorting
    this.dataSource.sortingDataAccessor = (data: StandingsRecord, property: string) => {
      switch (property) {
        case 'name': return data.short;
        case 'rank': return +data.rank;
        case 'wins': return +data.wins;
        case 'losses': return +data.losses;
        case 'pct': return +data.winPct + +data.diff; // hack to sort by both win pct and diff
        case 'ties': return +data.ties;
        case 'runsScored': return +data.rs;
        case 'runsAllowed': return +data.ra;
        case 'runDifferential': return +data.diff + +data.winPct; // hack to sort by both win pct and diff
        default: return '';
      }
    };
  }
  ngOnChanges() {
    console.log(this.standingsData);
    if (this.standingsData) {
      this.dataSource.data = this.standingsData;
      this.sort.sort(<MatSortable>{
        id: 'runDifferential',
        start: 'desc'
      });
      this.sort.sort(<MatSortable>{
        id: 'pct',
        start: 'desc'
      });
      this.dataSource.sort = this.sort;
    }
  }
}
