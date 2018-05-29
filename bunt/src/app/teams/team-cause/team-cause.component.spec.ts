import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamCauseComponent } from './team-cause.component';

describe('TeamCauseComponent', () => {
  let component: TeamCauseComponent;
  let fixture: ComponentFixture<TeamCauseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamCauseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamCauseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
