import { Component, OnInit } from '@angular/core';
import { StandingsService, StandingsRecord } from '../../shared/services/standings.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bunt-standings-page',
  templateUrl: './standings-page.component.html',
  styleUrls: ['./standings-page.component.scss']
})
export class StandingsPageComponent implements OnInit {
  standingsByLeague: any = {};
  leagues: string[] = [];
  constructor(private standingsService: StandingsService) { }

  ngOnInit() {
    this.standingsService.getStandings().subscribe(standings => {
      // Separate standings records by league
      this.standingsByLeague = standings.reduce((grouped, rec: StandingsRecord) => {
        const league = rec.league.division;
        if (Array.isArray(grouped[league])) {
          grouped[league].push(rec);
        } else {
          grouped[league] = new Array(rec);
        }
        return grouped;
      }, {});

      this.leagues = Object.keys(this.standingsByLeague);
    });
  }
}
