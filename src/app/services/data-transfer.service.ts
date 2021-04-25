import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  private selectTopicSource = new BehaviorSubject(null);
  // eslint-disable-next-line @typescript-eslint/member-ordering
  selectedTopic = this.selectTopicSource.asObservable();
  // eslint-disable-next-line @typescript-eslint/member-ordering
  topic = false;

  constructor() {}

  changeSelected(topic: any) {
      this.topic = topic;
    this.selectTopicSource.next(topic);
  }
}
