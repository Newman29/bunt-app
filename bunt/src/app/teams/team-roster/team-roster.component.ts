import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';

@Component({
  selector: 'bunt-team-roster',
  templateUrl: './team-roster.component.html',
  styleUrls: ['./team-roster.component.scss']
})
export class TeamRosterComponent implements OnInit, AfterViewInit {
  @Input() roster: string[];

  // Grid Settings
  columnNum = 4;
  rowHeight = '2rem';
  gutterSize = '8px';


  constructor(
    private media: ObservableMedia
  ) { }

  ngOnInit() {
    this.updateGrid();
    this.media.subscribe(change => {
      this.updateGrid();
    });
  }

  ngAfterViewInit() {
    this.updateGrid();
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
