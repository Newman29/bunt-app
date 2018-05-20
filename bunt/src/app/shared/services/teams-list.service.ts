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
  url = environment.firestoreUrl + '/bunt-2018/databases/(default)/documents/teams';

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) { }

  getTeams(): Observable<any> {
    if (!this.teamsData) {
      return this.http.get<FirestoreResponse>(this.url).pipe(
        map(res => {
          this.teamsData =  this.firestoreService.parseResponse(res);
          return this.teamsData;
        })
      );
    } else {
      return Observable.of(this.teamsData);
    }
  }
}


