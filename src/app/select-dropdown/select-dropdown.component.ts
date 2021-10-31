import { Component, DoCheck, OnChanges, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { DataTransferService } from '../Services/data-transfer.service';
import { Observable, Subject, Subscription } from 'rxjs';
import { Topic } from '../models/Topic';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss']
})
export class SelectDropdownComponent implements OnInit {
  selectFormControl = new FormControl(null, Validators.required);
  selectedMeetingStyle: any;
  smallBreakpoint = false;
  subscription?: Subscription;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private data: DataTransferService
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.$selectedTopic.subscribe(
      (topic) => (this.selectedMeetingStyle = topic)
    );

    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.smallBreakpoint = state.breakpoints[Breakpoints.XSmall];
      });
  }

  sendMeetingTopic(topicEvent: any) {
    this.data.dropdownTopic.next(topicEvent.value);
  }

  //   ngDoCheck() {
  //     // this.data.changeTopicSet();
  //     // this.data.changeSelected(this.selectedMeetingStyle);
  //   }
}
