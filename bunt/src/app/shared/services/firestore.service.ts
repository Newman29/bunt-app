import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  public parseResponse(res: FirestoreResponse): any[] {
    const data: any = []; // The data object to build and return
    const documents: FirestoreDocument[] = res.documents;

    documents.forEach((doc) => {
      data.push(this.documentToObject(doc));
    });

    return data;
  }

  private documentToObject(doc: FirestoreDocument): any {
    // Convert Firestore 'fields' structure to normal key/value pairs
    const obj = this.parseFields(doc.fields);

    // Add associated document metadata
    obj.createTime = doc.createTime;
    obj.updateTime = doc.updateTime;
    obj.documentName = doc.name;

    return obj;
  }

  // e.g. name: { stringValue: 'Dodgers' }
  private parseFields(fields: any): any {
    const data = {};
    const keys = Object.keys(fields);

    keys.forEach((key) => {
      const obj = fields[key]; // e.g. { stringValue: 'Dodgers' }
      const type = Object.keys(obj)[0]; // e.g. "stringValue"
      if (type === 'mapValue') {
        // For mapValue types, we need to parse the fields, we can do this recursively
        data[key] = this.parseFields(obj[type].fields);
      } else if (type === 'integerValue') {
        data[key] = Number(obj[type]);
      } else if (type === 'booleanValue') {
        data[key] = Boolean(obj[type]);
      } else {
        data[key] = obj[type]; // e.g. 'Dodgers'
      }
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
