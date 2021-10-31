import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Topic } from '../models/Topic';
import { ItemMapperService } from './item-mapper.service';

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
  selectedTopicSet$ = new Observable<Topic[]>();
  dropdownTopic = new Subject();
  dropdownSubscription = new Subscription();
  private selectTopicSource = new Subject();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  $selectedTopic = this.selectTopicSource.asObservable();
  // $selectedTopicSet = this.selectedTopicSet.asObservable();

  constructor(private itemMapper: ItemMapperService) {}

  changeSelected(topic: any): void {
    if (topic === '12-Step') {
      this.selectedTopicSet$ = this.itemMapper.getTopicCollection(
        this.twelveStepTopics,
      );
    } else {
      this.selectedTopicSet$ = this.itemMapper.getTopicCollection(
        this.CRCTopics,
      );
      this.selectedTopicSet$.subscribe((set) => console.log(set));
    }
    this.selectTopicSource.next(topic);
  }

  changeTopicSet() {
    // this.chosenSet = this.chooseTopicSet();
    // this.selectedTopicSet.next(this.chosenSet);
    this.dropdownSubscription = this.dropdownTopic.subscribe((topic) => {
      console.log(`The topic is: ${topic}`);
    });
  }

  // chooseTopicSet(): Observable<Topic[]> {
  //   if (this.topic === '12-Step') {
  //     return this.firestore.collection<Topic>('12StepTopics').valueChanges();
  //   } else {
  //     return this.firestore.collection<Topic>('CRCTopics').valueChanges();
  //   }
  // }

  chooseIndividualTopic() {}

  chooseTopicSet(topic: string): void {
    if (topic === this.twelveStepTopics) {
      this.selectedTopicSet$ = this.itemMapper.getTopicCollection(
        this.twelveStepTopics,
      );
    } else {
      this.selectedTopicSet$ = this.itemMapper.getTopicCollection(
        this.CRCTopics,
      );
    }
  }
}
