import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Topic } from '../models/Topic';
import {ItemMapperService} from './item-mapper.service';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  twelveStepTopics = '12StepTopics';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CRCTopics = 'CRCTopics';
  topic!: string;
  chosenSet!: Topic[];
  items!: Observable<any>;
  selectTopicSource = new BehaviorSubject(null);
  $selectedTopic = this.selectTopicSource.asObservable();
  // $selectedTopicSet = this.selectedTopicSet.asObservable();

  constructor(private itemMapper: ItemMapperService) {}

  changeSelected(topic: any): void {
    this.topic = topic;
    this.selectTopicSource.next(topic);

  }

  changeTopicSet() {
    // this.chosenSet = this.chooseTopicSet();
    // this.selectedTopicSet.next(this.chosenSet);
  }

  // chooseTopicSet(): Observable<Topic[]> {
  //   if (this.topic === '12-Step') {
  //     return this.firestore.collection<Topic>('12StepTopics').valueChanges();
  //   } else {
  //     return this.firestore.collection<Topic>('CRCTopics').valueChanges();
  //   }
  // }

  chooseTopicSet(): Observable<Topic[]> {
    if (this.topic === this.twelveStepTopics) {
      return this.itemMapper.getTopicCollection(this.twelveStepTopics);
    } else {
      return this.itemMapper.getTopicCollection(this.CRCTopics);
    }
  }
}
