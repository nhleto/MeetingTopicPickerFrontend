import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../models/Topic';

@Component({
  selector: 'app-topic-display',
  templateUrl: './topic-display.component.html',
  styleUrls: ['./topic-display.component.scss']
})
export class TopicDisplayComponent implements OnInit {
  @Input() chosenTopic?: Topic;

  constructor() {}

  ngOnInit(): void {}
}
