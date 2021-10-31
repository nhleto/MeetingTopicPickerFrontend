import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {Topic} from '../models/Topic';
import {DataTransferService} from '../Services/data-transfer.service';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition,} from '@angular/material/snack-bar';
import {BreakpointObserver, Breakpoints, BreakpointState,} from '@angular/cdk/layout';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  chosenTopic: Topic;
  selectedMeetingStyle: any = null;
  topics: any;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  smallBreakpoint = false;

  constructor(
    public dialog: MatDialog,
    private data: DataTransferService,
    private snackBar: MatSnackBar,
    private $breakpointObserver: BreakpointObserver,
  ) {
  }

  ngOnInit(): void {
    this.data.dropdownTopic.subscribe(
      (topic) => {
        this.selectedMeetingStyle = topic;
        this.data.chooseTopicSet(topic as string);
      });

    this.data.selectedTopicSet$.subscribe((topicSet) => {
      console.log(`in the SelectedTopicSet$ subscription in the output component`);
      console.log(topicSet);
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
      this.chosenTopic = this.topics[Math.floor(Math.random() * this.topics.length)];
      console.log(this.chosenTopic);
    }

    if (this.selectedMeetingStyle == null) {
      this.snackBar.open('Please Choose a Meeting Style', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
