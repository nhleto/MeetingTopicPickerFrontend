import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataTransferService {
  topic = false;
  selectTopicSource = new BehaviorSubject(null);
  selectedTopic = this.selectTopicSource.asObservable();

  constructor() {
  }

  changeSelected(topic: any): void {
    this.topic = topic;
    this.selectTopicSource.next(topic);
  }
}
