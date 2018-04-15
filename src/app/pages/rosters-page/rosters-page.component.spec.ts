import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RostersPageComponent } from './rosters-page.component';

describe('RostersPageComponent', () => {
  let component: RostersPageComponent;
  let fixture: ComponentFixture<RostersPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RostersPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RostersPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
