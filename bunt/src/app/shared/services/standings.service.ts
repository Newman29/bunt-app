import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { FirestoreService, FirestoreResponse } from './firestore.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  standingsData: any;
  url = environment.firestoreUrl + '/projects/bunt-2018/databases/(default)/documents/standings';

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) { }

  getStandings(): Observable<any> {
    if (!this.standingsData) {
      return this.http.get<FirestoreResponse>(this.url).pipe(
        map(res => {
          this.standingsData = this.firestoreService.parseResponse(res);
          return this.standingsData;
        })
      );
    } else {
      return Observable.of(this.standingsData);
    }
  }
}

export interface StandingsRecord {
  id: number;
  short: string;
  rank: number;
  wins: number;
  losses: number;
  ties: number;
  gp: number;
  winPct: number;
  rs: number;
  ra: number;
  diff: number;
  league: {
    division: string;
    wins: number;
    losses: number;
    ties: number;
    gp: number;
    winPct: number;
  };
}
