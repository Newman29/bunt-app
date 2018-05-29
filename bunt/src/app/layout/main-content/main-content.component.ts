import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Router, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';

@Component({
  selector: 'bunt-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.urlAfterRedirects.includes('/schedule')) {
          return;
        }
        window.scrollTo(0, 0);
      }
    });
  }
}
