import { Component, OnInit, Input, ElementRef, OnChanges } from '@angular/core';

const assetsRelativeUrl = '../../assets/';

@Component({
  selector: 'bunt-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit, OnChanges {
  @Input() team: TeamElement;
  captainFirstName: string;
  captainLastName: string;
  avatarFilename: string;

  constructor(private host: ElementRef) { }

  ngOnInit() { }
  ngOnChanges() {
    if (this.team) {
      this.captainFirstName = this.team.captain.split(' ')[0];
      this.captainLastName = this.team.captain.split(' ')[1];
      this.avatarFilename = assetsRelativeUrl + this.captainFirstName + this.captainLastName + '.jpg';
      this.avatarFilename = this.avatarFilename.toLowerCase();
    }
  }
}

export interface TeamElement {
  id: string;
  name: string;
  short: string;
  hex: string;
  color: string;
  textColor: string;
  captain: string;
  league: string;
}
