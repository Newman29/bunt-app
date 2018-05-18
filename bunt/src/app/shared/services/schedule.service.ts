import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { FirestoreResponse, FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url = environment.firestoreUrl + '/bunt-2018/databases/(default)/documents/games?pageSize=20';

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) { }

  getSchedule(): Observable<any> {
    return this.http.get<FirestoreResponse>(this.url).pipe(
      map(res => {
        return this.firestoreService.parseResponse(res);
      })
    );
  }
}
