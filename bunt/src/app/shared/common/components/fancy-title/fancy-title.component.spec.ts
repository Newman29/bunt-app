import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FancyTitleComponent } from './fancy-title.component';

describe('FancyTitleComponent', () => {
  let component: FancyTitleComponent;
  let fixture: ComponentFixture<FancyTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FancyTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FancyTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
