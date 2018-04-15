import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'bunt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() menuClicked: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toggleMenu() {
    this.menuClicked.emit(null);
  }
}
