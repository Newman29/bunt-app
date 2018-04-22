import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamsListService {
  url = '/assets/mocks/mock-teams.json';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    return this.http.get(this.url);
  }
}
