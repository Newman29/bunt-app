import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  relativeUrl = '/assets/mocks/mock-standings.json';

  constructor(private http: HttpClient) { }

  getStandings(): Observable<any> {
    return this.http.get(this.relativeUrl);
  }
}
