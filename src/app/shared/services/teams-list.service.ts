import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TeamsListService {
  url = environment.firestoreUrl + '/bunt-2018/databases/(default)/documents/teams';

  constructor(private http: HttpClient) { }

  getTeams(): Observable<any> {
    return this.http.get<FirestoreResponse>(this.url).pipe(
      map(res => {
        const documents = res.documents;
        return this.parseFirestore(res);
      })
    );
  }

  /**
   * 
   * @param res A FireStore response from the REST API
   * 
   * Parses a FireStoreResponse into flattened data.
   * Future features will convert the FireStore types into TypeScript types.
   * e.g. name: { stringValue: 'Bill' } to name<string>: 'Bill'
   * 
   */
  parseFirestore(res: FirestoreResponse) {
    let data: any = [];
    const documents = res.documents;
    documents.forEach(doc => {
      let item: any = {};
      // extract all fields as keys
      const keys = Object.keys(doc.fields);

      // extract field values and move the key to a data type
      keys.forEach(key => {
        const valueType = Object.keys(doc.fields[key])[0];
        item[key] = doc.fields[key][valueType];
      });

      item.createTime = doc.createTime;
      item.updateTime = doc.updateTime;
      data.push(item);
    });

    return data;
  }
}

export interface FirestoreResponse {
  documents: FirestoreDocument[];
}

export interface FirestoreDocument {
  name: string;
  fields: Object;
  createTime: string;
  updateTime: string;
}
