import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Topic } from '../models/Topic';
import { Subscription } from 'rxjs';
import { DataTransferService } from '../services/data-transfer.service';
import { TOPICS } from '../models/Topics';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormControl, Validators } from '@angular/forms';
import {
  BreakpointObserver,
  BreakpointState,
  Breakpoints,
} from '@angular/cdk/layout';

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss'],
})
export class OutputComponent implements OnInit {
  chosenTopic?: Topic;
  subscription?: Subscription;
  selectedMeetingStyle: any = null;
  topics: Topic[] = TOPICS;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  selectFormControl = new FormControl(null, Validators.required);
  smallBreakpoint = false;

  constructor(
    public dialog: MatDialog,
    private data: DataTransferService,
    private snackBar: MatSnackBar,
    private breakpointObserver: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.selectedTopic.subscribe(
      (topic) => (this.selectedMeetingStyle = topic)
    );
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        if (state.breakpoints[Breakpoints.XSmall]) {
          this.smallBreakpoint = true;
        } else {
          this.smallBreakpoint = false;
        }
      });
  }

  chooseTopic(): void {
    this.chosenTopic = this.topics[
      Math.floor(Math.random() * this.topics.length)
    ];
  }

  generateTopic() {
    if (this.selectedMeetingStyle != null) {
      this.chooseTopic();
    }
  }

  openSnackBar() {
    if (this.selectedMeetingStyle == null) {
      this.snackBar.open('Please Choose a Meeting Style', 'Close', {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
      });
    }
  }
}
