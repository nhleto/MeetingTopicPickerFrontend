import { Injectable } from '@angular/core';
import {BehaviorSubject, merge, Observable, Subject, Subscription} from 'rxjs';
import { Topic } from '../models/Topic';
import { ItemMapperService } from './item-mapper.service';
import {flatMap, mergeMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  twelveStepTopics = '12StepTopics';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CRCTopics = 'CRCTopics';
  topic!: string;
  chosenSet!: Topic[];
  items: Observable<Topic[]>;
  selectedTopicSet$ = new Subject();
  dropdownTopic = new Subject();
  private selectTopicSource = new Subject();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  $selectedTopic = this.selectTopicSource.asObservable();
  // $selectedTopicSet = this.selectedTopicSet.asObservable();

  constructor(private itemMapper: ItemMapperService) {}

  // chooseIndividualTopic() {
    // May want to move the logic for this out of the output component
  // }

  chooseTopicSet(topic: string): void {
    this.fetchFirestoreTopics(topic);
  }

  private fetchFirestoreTopics(topic: string) {
    if (topic === '12-Step') {
      this.itemMapper.getTopicCollection(this.twelveStepTopics).subscribe(
        topics => this.selectedTopicSet$.next(topics)
      );
    } else {
      this.itemMapper.getTopicCollection(this.CRCTopics).subscribe(
        topics => this.selectedTopicSet$.next(topics)
      );
    }
  }
}
