import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Topic } from '../models/Topic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ItemMapperService {
  constructor(private firestore: AngularFirestore) {}

  public getTopicCollection(topic: string): Observable<Topic[]> {
    return this.firestore.collection<Topic>(topic).valueChanges();
  }
}
