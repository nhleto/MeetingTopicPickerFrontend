import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Topic} from '../models/Topic';

@Injectable({
  providedIn: 'root'
})
export class ItemMapperService {

  constructor(private firestore: AngularFirestore) {
  }


  public getTopicCollection(topic: string) {
    return this.firestore.collection<Topic>(topic);
  }

  public writeTopicCollection(topic: Topic, title: string) {
    this.firestore.collection<Topic>(title)
      .add(topic)
      .then(res => console.log(res))
      .catch(e => console.error(e));
  }

}
