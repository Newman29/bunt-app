import { Component, OnInit } from '@angular/core';
import { StandingsService } from '../../shared/services/standings.service';

@Component({
  selector: 'bunt-standings-page',
  templateUrl: './standings-page.component.html',
  styleUrls: ['./standings-page.component.scss']
})
export class StandingsPageComponent implements OnInit {
  // TODO: Placeholders, remove after real data
  standings: any = [];
  leagueNames: any[] = ['Stripes League', 'Solids League'];

  constructor(private standingsService: StandingsService) { }

  ngOnInit() {
    this.standingsService.getStandings().subscribe(res => {
      this.standings = res;
    });
  }

}
