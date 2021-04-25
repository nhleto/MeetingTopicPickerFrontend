import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-description-panel',
  templateUrl: './description-panel.component.html',
  styleUrls: ['./description-panel.component.scss'],
})
export class DescriptionPanelComponent implements OnInit {
  panelOpenState = false;
  constructor() {}

  ngOnInit(): void {}
}
