import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Topic } from '../models/Topic';
import { DataTransferService } from '../Services/data-transfer.service';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from '@angular/cdk/layout';
import { ItemMapperService } from '../Services/item-mapper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  chosenTopic: Topic;
  selectedMeetingStyle: any = null;
  topics: Topic[];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  smallBreakpoint = false;
  subscript = new Subscription();

  constructor(
    public dialog: MatDialog,
    private data: DataTransferService,
    private snackBar: MatSnackBar,
    private $breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit(): void {
    this.data.dropdownTopic.subscribe(
      (topic) => {
        console.log(`In output component: ${topic}`);
        this.selectedMeetingStyle = topic;
        this.data.chooseTopicSet(topic as string);
      });

    this.subscript = this.data.selectedTopicSet$.subscribe((topicSet: Topic[]) => {
      console.log(`In the output component to get the toic set: ${topicSet}`);
      this.topics = topicSet;
    });

    // This acutally isnt being used anymore
    this.$breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.smallBreakpoint = state.breakpoints[Breakpoints.XSmall];
      });
  }

  openSnackBar() {
    if (this.selectedMeetingStyle != null && this.topics != null) {
      this.chooseTopic();
    }

    if (this.selectedMeetingStyle == null) {
      this.snackBar.open('Please Choose a Meeting Style', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }

  private chooseTopic(): void {
    this.chosenTopic =
      this.topics[Math.floor(Math.random() * this.topics.length)];
  }
}
