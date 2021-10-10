import {Component, DoCheck, OnInit} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {BreakpointObserver, Breakpoints, BreakpointState} from '@angular/cdk/layout';
import {DataTransferService} from '../Services/data-transfer.service';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.scss'],
})
export class SelectDropdownComponent implements OnInit, DoCheck {
  selectFormControl = new FormControl(null, Validators.required);
  selectedMeetingStyle: any;
  smallBreakpoint = false;
  subscription?: Subscription;

  constructor(
    public breakpointObserver: BreakpointObserver,
    private data: DataTransferService,
    private firestore: AngularFirestore
  ) {
  }

  ngOnInit(): void {
    // this.firestore.collection('12StepTopics').valueChanges().subscribe(value => console.log(value));

    this.subscription = this.data.$selectedTopic.subscribe(
      (topic) => (this.selectedMeetingStyle = topic)
    );
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState) => {
        this.smallBreakpoint = state.breakpoints[Breakpoints.XSmall];
      });
  }

  ngDoCheck() {
    // This is getting removed... I dont think it does anything.
    this.data.changeTopicSet();
    this.data.changeSelected(this.selectedMeetingStyle);
  }
}
