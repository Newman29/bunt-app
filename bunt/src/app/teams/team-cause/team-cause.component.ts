import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bunt-team-cause',
  templateUrl: './team-cause.component.html',
  styleUrls: ['./team-cause.component.scss']
})
export class TeamCauseComponent implements OnInit {
  @Input() cause: any;

  constructor() { }

  ngOnInit() {
  }

}
