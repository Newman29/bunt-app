import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class StandingsService {
  relativeUrl = '/assets/mocks/mock-standings.json';

  constructor(private http: HttpClient) { }

  getStandings(): Observable<HttpResponse> {
    return this.http.get(this.relativeUrl);
  }
}
