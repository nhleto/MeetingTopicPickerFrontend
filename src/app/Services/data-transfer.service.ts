import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {TOPICS} from '../models/12StepTopics';
import {CRCTOPICS} from '../models/CRCTopics';
import {Topic} from '../models/Topic';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  topic!: string;
  chosenSet!: Topic[];
  items!: Observable<any>;
  selectTopicSource = new BehaviorSubject(null);
  $selectedTopic = this.selectTopicSource.asObservable();
  selectedTopicSet = new BehaviorSubject(TOPICS);
  $selectedTopicSet = this.selectedTopicSet.asObservable();

  constructor(private firestore: AngularFirestore) {
  }

  changeSelected(topic: any): void {
    this.topic = topic;
    this.selectTopicSource.next(topic);
  }

  changeTopicSet() {
    this.chosenSet = this.chooseTopicSet();
    this.selectedTopicSet.next(this.chosenSet);
  }

  chooseTopicSet = (): Topic[] => this.topic === '12-Step' ? TOPICS : CRCTOPICS;
}
