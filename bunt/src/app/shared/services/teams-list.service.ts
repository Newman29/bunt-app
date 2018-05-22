import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { FirestoreResponse, FirestoreDocument, FirestoreService } from './firestore.service';


@Injectable({
  providedIn: 'root'
})
export class TeamsListService {
  teamsData: any;
  rostersData: any = {};
  url = environment.firestoreUrl + '/projects/bunt-2018/databases/(default)/documents/teams';
  rostersCollection = 'roster';

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) { }

  getTeams(): Observable<any> {
    if (!this.teamsData) {
      return this.http.get<FirestoreResponse>(this.url).pipe(
        map(res => {
          this.teamsData = {};
          // Gets an array of team data
          const data = this.firestoreService.parseResponse(res);

          // We need to convert to a team object with team ids as keys and
          // array of team ids for each league
          data.forEach(team => {
            // If the league doesn't exist yet, create one.
            if (typeof this.teamsData[team.league] === 'undefined') {
              this.teamsData[team.league] = {};
            }

            this.teamsData[team.league][team.id] = team;
          });
          return this.teamsData;
        })
      );
    } else {
      return Observable.of(this.teamsData);
    }
  }

  getRostersForTeam(docLocation): Observable<any> {
    const url = environment.firestoreUrl + `/${docLocation}/${this.rostersCollection}`;

    if (!this.rostersData[docLocation]) {
      return this.http.get<FirestoreResponse>(url).pipe(
        map(res => {
          this.rostersData[docLocation] = this.firestoreService.parseResponse(res).map(player => player.name);
          return this.rostersData[docLocation];
        })
      );
    } else {
      return Observable.of(this.rostersData[docLocation]);
    }
  }
}


