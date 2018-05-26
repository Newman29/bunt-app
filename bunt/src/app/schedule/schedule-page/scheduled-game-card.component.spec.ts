import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledGameCardComponent } from './scheduled-game-card.component';

describe('ScheduledGameCardComponent', () => {
  let component: ScheduledGameCardComponent;
  let fixture: ComponentFixture<ScheduledGameCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledGameCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledGameCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
