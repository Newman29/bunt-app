import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { FirestoreResponse, FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  scheduleData: any;
  url = environment.firestoreUrl + '/projects/bunt-2018/databases/(default)/documents/games?pageSize=100';

  constructor(
    private http: HttpClient,
    private firestoreService: FirestoreService
  ) { }

  getSchedule(): Observable<any> {
    if (!this.scheduleData) {
      return this.http.get<FirestoreResponse>(this.url).pipe(
        map(res => {
          this.scheduleData = this.firestoreService.parseResponse(res);
          return this.scheduleData;
        })
      );
    } else {
      return Observable.of(this.scheduleData);
    }
  }
}
