import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOPICS } from '../models/12StepTopics';
import { CRCTOPICS } from '../models/CRCTopics';
import { Topic } from '../models/Topic';
import {ItemMapperService} from './item-mapper.service';
import {CR} from '@angular/compiler/src/i18n/serializers/xml_helper';

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

  constructor(private itemMapper: ItemMapperService) {}

  changeSelected(topic: any): void {
    this.topic = topic;
    this.selectTopicSource.next(topic);

  }

  writeTopic() {
    CRCTOPICS.forEach(t => {
      this.itemMapper.writeTopicCollection(t, 'CRCTopics');
    });
  }

  changeTopicSet() {
    this.chosenSet = this.chooseTopicSet();
    this.selectedTopicSet.next(this.chosenSet);
  }

  // chooseTopicSet(): Observable<Topic[]> {
  //   if (this.topic === '12-Step') {
  //     return this.firestore.collection<Topic>('12StepTopics').valueChanges();
  //   } else {
  //     return this.firestore.collection<Topic>('CRCTopics').valueChanges();
  //   }
  // }

  chooseTopicSet = (): Topic[] =>
    this.topic === '12-Step' ? TOPICS : CRCTOPICS;
}
