import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bunt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked: EventEmitter<any> = new EventEmitter();
  routeTitle = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.router.events.subscribe(evt => {
      if (evt instanceof NavigationEnd) {
        if (this.route.snapshot.firstChild.data.title) {
          this.routeTitle = this.route.snapshot.firstChild.data.title;
        } else {
          this.routeTitle = '';
        }
      }
    });
  }

  toggleMenu() {
    this.menuClicked.emit(null);
  }
}
