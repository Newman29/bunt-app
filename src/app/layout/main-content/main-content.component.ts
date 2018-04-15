import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

@Component({
  selector: 'bunt-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  @ViewChild(MatSidenav) sidenav: MatSidenav;

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.sidenav.toggle();
  }
}
