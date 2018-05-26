import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'bunt-rules-page',
  templateUrl: './rules-page.component.html',
  styleUrls: ['./rules-page.component.scss']
})
export class RulesPageComponent implements OnInit {
  // tslint:disable-next-line:max-line-length
  rulesUrl = 'https://firebasestorage.googleapis.com/v0/b/bunt-2018.appspot.com/o/bunt-assets%2F2018-ilmn-softball-rules.pdf?alt=media&token=d9ae961f-8feb-4d86-9ccd-04f14efd77df';
  currentPage = 1;

  constructor() { }

  ngOnInit() {
  }

  nextPage() {
    this.currentPage++;
  }

  previousPage() {
    this.currentPage--;
  }
}
