import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Topic } from '../models/Topic';
import { ItemMapperService } from './item-mapper.service';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  twelveStepTopics = '12StepTopics';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CRCTopics = 'CRCTopics';
  topic!: string;
  chosenSet!: Topic[];
  items!: Observable<any>;
  selectedTopicSet$ = new Observable<Topic[]>();
  dropdownTopic = new Subject();
  dropdownSubscription = new Subscription();
  private selectTopicSource = new Subject();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  $selectedTopic = this.selectTopicSource.asObservable();
  // $selectedTopicSet = this.selectedTopicSet.asObservable();

  constructor(private itemMapper: ItemMapperService) {}

  changeSelected(topic: any): void {
    this.fetchFirestoreTopics(topic);
    this.selectTopicSource.next(topic);
  }

  chooseIndividualTopic() {}

  chooseTopicSet(topic: string): void {
    this.fetchFirestoreTopics(topic);
  }

  private fetchFirestoreTopics(topic: string) {
    if (topic === '12-Step') {
      this.selectedTopicSet$ = this.itemMapper.getTopicCollection(this.twelveStepTopics);
      this.selectedTopicSet$.subscribe((set) => console.log(set));
    } else {
      this.selectedTopicSet$ = this.itemMapper.getTopicCollection(this.CRCTopics);
      this.selectedTopicSet$.subscribe((set) => console.log(set));
    }
  }
}
