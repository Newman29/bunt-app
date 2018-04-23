import { Component, OnInit, Input, ElementRef, Renderer2, OnChanges } from '@angular/core';

@Component({
  selector: 'bunt-team-card',
  templateUrl: './team-card.component.html',
  styleUrls: ['./team-card.component.scss']
})
export class TeamCardComponent implements OnInit, OnChanges {
  @Input() team: TeamElement;

  constructor(private host: ElementRef, private renderer: Renderer2) { }

  ngOnInit() { }
  ngOnChanges() {
    this.renderer.setStyle(this.host.nativeElement, 'border-color', this.team.hex);
  }

}

export interface TeamElement {
  name: string;
  short: string;
  hex: string;
  nickname: string;
}
